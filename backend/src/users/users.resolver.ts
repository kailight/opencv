import { Resolver, Query, Mutation, ResolveField, Parent, Args, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PRISMA_TOKEN } from '@/prisma/prisma.module.js';
import { User } from '@/users/models/user.model.js';
import { Skill } from '@/skills/models/skill.model.js';
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
    const { id } = user;

    if (!user || !id) {
      return [];
    }

    // Using Prisma's relation fluent API to fetch the connected skills
    return this.prisma.user.findUnique({ where: { id } }).skills();
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