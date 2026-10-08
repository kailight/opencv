import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Job {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  start: string;

  @Field()
  finish: string;

  @Field()
  position: string;

  @Field()
  description: string;

  @Field()
  details: string;
}