import { Module } from '@nestjs/common';
import { UsersResolver } from '@/users/users.resolver.js';
import { SkillsResolver } from '@/skills/skills.resolver.js';

@Module({
  providers: [UsersResolver,SkillsResolver],
})
export class UsersModule {}