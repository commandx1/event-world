/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterInput {
    @Field()
    @IsEmail()
        email: string;

    @Field()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
        password: string;

    @Field({ nullable: true })
    @IsString()
        name?: string;
} 