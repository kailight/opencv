import { Module } from '@nestjs/common';
import { SkillsResolver } from './skills.resolver.js';
import { UsersResolver } from '@/users/users.resolver.js';
import { SkillGroupsResolver } from '@/skillGroups/skillGroups.resolver.js';

@Module({
  providers: [SkillsResolver,UsersResolver],
})
export class SkillsModule {}