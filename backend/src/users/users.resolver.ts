import { Resolver, Query, Mutation, ResolveField, Parent, Args, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PRISMA_TOKEN } from '@/prisma/prisma.module.js';
import { User } from '@/users/models/user.model.js';
import { Skill } from '@/skills/models/skill.model.js';
import { SkillGroup } from '@/skillGroups/models/skillGroup.model.js';
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

  @ResolveField(() => [SkillGroup], { name: 'skillGroups' })
  async getSkillGroups(@Parent() user: User) {
    if (!user || !user.id) return [];

    // 1. Fetch the user's skills and eagerly include the skillGroup details
    const userSkills = await this.prisma.userSkill.findMany({
      where: { userId: user.id },
      include: {
        skill: {
          include: {
            skillGroup: true,
          },
        },
      },
    });

    // 2. Group the data using a JavaScript Map
    const groupMap = new Map<number, any>();

    for (const pivotRecord of userSkills) {
      const skill = pivotRecord.skill;
      if (!skill || !skill.skillGroup) continue;

      const group = skill.skillGroup;

      if (!groupMap.has(group.id)) {
        groupMap.set(group.id, {
          id: group.id,
          title: group.title,
          skills: [], // Initialize an empty array for this group's skills
        });
      }

      // Push the current skill into its respective group container
      groupMap.get(group.id).skills.push({
        id: skill.id,
        title: skill.title,
      });
    }

    // 3. Return an array of the grouped objects matching your GraphQL expectations
    return Array.from(groupMap.values());
  }

  @Mutation(() => User)
  async createUser(
      @Args('firstName') firstName: string,
      @Args('lastName') lastName: string,
      @Args('nickName') nickName: string,
      @Args('email') email: string,
      @Args('password') password: string,
      @Args('phone') phone: string,
      @Args('telegram') telegram: string,
      @Args('city') city: string,
      @Args('country') country: string,
      @Args('about') about: string,
  ) {
    return this.prisma.user.create({
      data: { firstName, lastName, nickName, email, password, phone, telegram, city, country, about },
    });
  }

}