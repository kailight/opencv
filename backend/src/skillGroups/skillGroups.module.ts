import { Module } from '@nestjs/common';
import { SkillGroupsResolver } from './skillGroups.resolver.js';

@Module({
  providers: [SkillGroupsResolver],
})
export class SkillGroupsModule {}