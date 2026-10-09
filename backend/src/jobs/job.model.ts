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

  @Field({nullable: true})
  city: string;

  @Field({nullable: true})
  country: string;

  @Field({nullable: true})
  contract: string;

  @Field()
  position: string;

  @Field()
  description: string;

  @Field({nullable: true})
  details: string;
}