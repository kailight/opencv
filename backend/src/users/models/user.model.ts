import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Skill } from '@/skills/models/skill.model.js'
import { SkillGroup } from '@/skillGroups/models/skillGroup.model.js'

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  nickName: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  telegram: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  about: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => [SkillGroup], { nullable: 'items' })
  skillGroups: SkillGroup[];
}