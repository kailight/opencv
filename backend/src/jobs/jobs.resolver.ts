import { Resolver, Query, Mutation, Args, Parent, ResolveField, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PRISMA_TOKEN } from '@/prisma/prisma.module.js';
import { PrismaService} from "../prisma/prisma.service.js";
import { Job } from '@/jobs/job.model.js';
import { User } from '@/users/user.model.js';
import { SkillGroup } from '@/skillGroups/skillGroup.model.js';
import type { PrismaClient } from '../../src/generated/client/index.js';

@Resolver(() => Job)
export class JobsResolver {
  constructor(
    @Inject(PRISMA_TOKEN) private readonly prisma: PrismaClient
  ) {}

  @Query(() => [Job], { name: 'jobs' })
  async getJobs(@Parent() user: User) {
    // if (!user || !user.id) return [];

    return this.prisma.job.findMany({
      where: { userId: user.id },
    });

  }

  @Query(() => Job, { name: 'job', nullable: true })
  async getJob(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.job.findUnique({
      where: { id },
    });
  }

  @Mutation(() => Job)
  async createJob(
      @Args('title') title: string,
      @Args('start') start: string,
      @Args('finish') finish: string,
      @Args('position') position: string,
      @Args('description') description: string,
  ) {
    return this.prisma.skill.create({
      data: { title, start, finish, position, description },
    });
  }

  @ResolveField(() => User, { name: 'user' })
  async getUser(@Parent() user: User) {
    if (!user || !user.id) return null;

    return this.prisma.user.findUnique({ where: { id: user.id } }).job();
  }

}