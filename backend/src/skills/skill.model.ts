import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SkillGroup } from '@/skillGroups/skillGroup.model.js'

@ObjectType()
export class Skill {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => SkillGroup)
  skillGroup: SkillGroup & {};
}