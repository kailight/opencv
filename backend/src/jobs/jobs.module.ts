import { Module } from '@nestjs/common';
import { JobsResolver } from './jobs.resolver.js';
import { UsersResolver } from '@/users/users.resolver.js';
// import { SkillGroupsResolver } from '@/skillGroups/skillGroups.resolver.js';

@Module({
  providers: [JobsResolver,UsersResolver],
})
export class JobsModule {}