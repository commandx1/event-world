import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'super_secret_key',
            signOptions: { expiresIn: '7d' },
        }),
    ],
    providers: [AuthService, AuthResolver, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
