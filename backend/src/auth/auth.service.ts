import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { LoginInput } from './dto/login.dto';
import { RegisterInput } from './dto/register.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    generateToken(user: User) {
        const payload = {
            sub: user.id,
            email: user.email,
        };
        return this.jwtService.sign(payload);
    }

    async login(loginInput: LoginInput) {
        const user = await this.validateUser(
            loginInput.email,
            loginInput.password,
        );

        return {
            accessToken: this.generateToken(user),
            user,
        };
    }

    async register(registerInput: RegisterInput) {
        const existingUser = await this.userService.findByEmail(registerInput.email);
        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(registerInput.password, 10);

        const newUser = await this.userService.create({
            email: registerInput.email,
            password: hashedPassword,
            name: registerInput.name,
        });

        return {
            success: true,
            accessToken: this.generateToken(newUser),
            user: newUser,
        };
    }
}
