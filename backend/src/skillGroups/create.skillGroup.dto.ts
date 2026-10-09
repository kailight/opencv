import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSkillGroupInput {
  @Field()
  title: string;
}