import { Module } from '@nestjs/common';
import { SkillsResolver } from './skills.resolver.js';

@Module({
  providers: [SkillsResolver],
})
export class SkillsModule {}