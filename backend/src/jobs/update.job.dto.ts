import {Field, Int, ObjectType, InputType, ResolveField, Parent} from '@nestjs/graphql';
import {User} from "@/users/user.model.js";

@InputType()
export class UpdateJobInput {
  @Field({ nullable: true })
  description?: string;
}