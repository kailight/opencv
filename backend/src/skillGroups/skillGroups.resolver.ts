import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PRISMA_TOKEN } from '@/prisma/prisma.module.js';
import { PrismaService} from "../prisma/prisma.service.js";
import { Skill } from '@/skills/models/skill.model.js';
import { SkillGroup } from '@/skillGroups/models/skillGroup.model.js';
import type { PrismaClient } from '../../src/generated/client/index.js';

@Resolver(() => SkillGroup)
export class SkillGroupsResolver {
  constructor(
    @Inject(PRISMA_TOKEN) private readonly prisma: PrismaClient
  ) {}


  @Query(() => [SkillGroup], { name: 'skillGroups' })
  async getSkillGroups() {
    return this.prisma.skillGroup.findMany();
  }

  @Query(() => Skill, { name: 'skill', nullable: true })
  async getSkill(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.skillGroup.findUnique({
      where: { id },
    });
  }

  @Mutation(() => SkillGroup)
  async createSkillGroup(
      @Args('title') title: string,
  ) {
    return this.prisma.skillGroup.create({
      data: { title },
    });
  }

}