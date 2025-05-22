import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';

@ObjectType()
export class LoginResult {
  @Field(() => User)
      user: User;
}

@ObjectType()
export class RegisterResult {
  @Field()
      success: boolean;

  @Field(() => User, { nullable: true })
      user?: User;
}
