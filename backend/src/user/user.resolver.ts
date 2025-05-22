import { UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { User } from './entities/user.entity';
import { UserService } from './user.service';


@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => User, { name: 'me' })
    @UseGuards(JwtAuthGuard)
    getMe(@CurrentUser() user: User): User {
        return user;
    }

    @Query(() => User, { name: 'user', nullable: true })
    @UseGuards(JwtAuthGuard)
    async getUser(@Args('id', { type: () => ID }) id: number): Promise<User | null> {
        return this.userService.findById(id);
    }
} 