import { Resolver, Query, Mutation, ResolveField, Parent, Args, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PRISMA_TOKEN } from '@/prisma/prisma.module.js';
import { User } from '@/users/user.model.js';
import { Skill } from '@/skills/skill.model.js';
import { Job } from '@/jobs/job.model.js';
import { SkillGroup } from '@/skillGroups/skillGroup.model.js';
import type { PrismaClient } from '../../src/generated/client/index.js';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @Inject(PRISMA_TOKEN) private readonly prisma: PrismaClient
  ) {}


  @Query(() => [User], { name: 'users' })
  async getUsers() {
    return this.prisma.user.findMany();
  }

  @Query(() => User, { name: 'user', nullable: true })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  @ResolveField(() => [Skill], { name: 'skills' })
  async getSkills(@Parent() user: User) {
    if (!user || !user.id) return [];

    // Using Prisma's relation fluent API to fetch the connected skills
    const userSkills = await this.prisma.userSkill.findMany({
      where: { userId: user.id },
      include: {
        skill: true, // Tells Prisma to eager-load the core Skill object records
      },
    });

    const mappedSkills = userSkills.map((pivotRecord) => pivotRecord.skill);

    return mappedSkills.filter((skill) => skill !== null && skill !== undefined);
  }

  @ResolveField(() => [Job], { name: 'jobs' })
  async getJobs(@Parent() user: User) {
    if (!user || !user.id) return [];

    // Using Prisma's relation fluent API to fetch the connected skills
    const userJobs = await this.prisma.job.findMany({
      where: { userId: user.id },
      // include: {
      //   job: true, // Tells Prisma to eager-load the core Job object records
      // },
    });

    return userJobs

    // const mappedJobs = userJobs.map((pivotRecord) => pivotRecord.job);

    // return mappedJobs.filter((job) => job !== null && job !== undefined);
  }

  @ResolveField(() => [SkillGroup], { name: 'skillGroups' })
  async getSkillGroups(@Parent() user: User) {
    if (!user || !user.id) return [];

    try {
      // 1. Fetch exactly what we need using a raw query to guarantee clean execution inside Linux containers
      const rows = await this.prisma.$queryRaw<
                              Array<{
                                groupId: number;
                                groupTitle: string;
                                skillId: number;
                                skillTitle: string;
                              }>
      >`
        SELECT 
          sg.id AS groupId,
          sg.title AS groupTitle,
          s.id AS skillId,
          s.title AS skillTitle
        FROM users_skills us
        INNER JOIN skills s ON us.skill_id = s.id
        INNER JOIN skillgroups sg ON s.skillgroup_id = sg.id
        WHERE us.user_id = ${user.id}
        ORDER BY sg.id ASC, s.title ASC
      `;

      // 2. Safely reconstruct the data into the exact format your GraphQL object schema expects
      const groupMap = new Map<number, any>();

      for (const row of rows) {
        if (!groupMap.has(row.groupId)) {
          groupMap.set(row.groupId, {
            id: row.groupId,
            title: row.groupTitle,
            skills: [],
          });
        }

        groupMap.get(row.groupId).skills.push({
          id: row.skillId,
          title: row.skillTitle,
        });
      }

      // 3. Always return an array to fulfill the non-nullable constraint
      return Array.from(groupMap.values());
    } catch (error) {
      console.error('Failed to resolve grouped skillGroups inside container:', error);
      return []; // Safe fallback prevents 'Cannot return null' crashes
    }

  }

  @Mutation(() => User)
  async createUser(
      @Args('firstName') firstName: string,
      @Args('lastName') lastName: string,
      @Args('nickName') nickName: string,
      @Args('email') email: string,
      @Args('password') password: string,
      @Args('phone') phone?: string,
      @Args('telegram') telegram?: string,
      @Args('city') city?: string,
      @Args('country') country?: string,
      @Args('summary') summary?: string,
  ) {
    return this.prisma.user.create({
      data: { firstName, lastName, nickName, email, password, phone, telegram, city, country, summary },
    });
  }

}