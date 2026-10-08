import { Resolver, Query, Mutation, Args, Parent, ResolveField, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PRISMA_TOKEN } from '@/prisma/prisma.module.js';
import { PrismaService} from "../prisma/prisma.service.js";
import { Skill } from '@/skills/models/skill.model.js';
import { User } from '@/users/models/user.model.js';
import { SkillGroup } from '@/skillGroups/models/skillGroup.model.js';
import type { PrismaClient } from '../../src/generated/client/index.js';

@Resolver(() => Skill)
export class SkillsResolver {
  constructor(
    @Inject(PRISMA_TOKEN) private readonly prisma: PrismaClient
  ) {}

  @Query(() => [Skill], { name: 'skills' })
  async getSkills(@Parent() user: User) {
    // if (!user || !user.id) return [];

    return this.prisma.skill.findMany();

    const userSkills = await this.prisma.userSkill.findMany({
      where: { userId: user.id },
      include: {
        skill: true
      },
    });

    const result = userSkills.map((pivotRecord) => pivotRecord.skill);

    return result;


  }

  @Query(() => Skill, { name: 'skill', nullable: true })
  async getSkill(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.skill.findUnique({
      where: { id },
    });
  }

  @Mutation(() => Skill)
  async createSkill(
      @Args('title') title: string,
  ) {
    return this.prisma.skill.create({
      data: { title },
    });
  }

  @ResolveField(() => SkillGroup, { name: 'skillGroup' })
  async getSkillGroup(@Parent() skill: Skill) {
    if (!skill || !skill.id) return null;

    return this.prisma.skill.findUnique({ where: { id: skill.id } }).skillGroup();
  }

}