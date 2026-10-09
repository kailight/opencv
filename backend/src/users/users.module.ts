import { Module } from '@nestjs/common';
import { UsersResolver } from '@/users/users.resolver.js';
import { SkillsResolver } from '@/skills/skills.resolver.js';
import { JobsResolver } from "@/jobs/jobs.resolver.js";

@Module({
  providers: [UsersResolver,SkillsResolver,JobsResolver],
})
export class UsersModule {}