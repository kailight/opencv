import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { User } from './models/user.model.js';

@Resolver(() => User)
export class UsersResolver {

  @Query(() => [User], { name: 'users' })
  async getUsers() {
    return [
      { id: 1, nickName: 'Kai Light' }
    ];
  }

  @Query(() => User, { name: 'user', nullable: true })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return { id, nickName: 'Single User Stub' };
  }
}