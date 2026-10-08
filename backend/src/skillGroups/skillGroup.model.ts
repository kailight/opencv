import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Skill } from '@/skills/skill.model.js';

@ObjectType()
export class SkillGroup {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => [Skill], { nullable: 'items' })
  skills: Skill[];
}