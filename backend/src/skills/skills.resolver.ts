import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PRISMA_TOKEN } from '@/prisma/prisma.module.js';
import { PrismaService} from "../prisma/prisma.service.js";
import { Skill } from '@/skills/models/skill.model.js';
import type { PrismaClient } from '../../src/generated/client/index.js';

@Resolver(() => Skill)
export class SkillsResolver {
  constructor(
    @Inject(PRISMA_TOKEN) private readonly prisma: PrismaClient
  ) {}


  @Query(() => [Skill], { name: 'skills' })
  async getSkills() {
    return this.prisma.skill.findMany();
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

}