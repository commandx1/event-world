import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.dto';
import { RegisterInput } from './dto/register.dto';
import { LoginResult, RegisterResult } from './models/auth.model';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

  @Mutation(() => LoginResult)
    async login(
    @Args('input') loginInput: LoginInput,
    @Context() context: { res: Response },
    ) {
        const result = await this.authService.login(loginInput);

        context.res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60,
        });

        return result;
    }

  @Mutation(() => RegisterResult)
  async register(
    @Args('input') registerInput: RegisterInput,
    @Context() context: { res: Response },
  ) {
      const result = await this.authService.register(registerInput);

      context.res.cookie('accessToken', result.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 1000 * 60,
      });

      return result;
  }

  @Mutation(() => Boolean)
  logout(@Context() context: { res: Response }) {
      context.res.clearCookie('accessToken', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
      });
      return true;
  }
}
