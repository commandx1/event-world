/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';

import { AppModule } from './app.module';

config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log'],
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
    app.use(cookieParser());

    app.enableCors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    });

    app.setGlobalPrefix('api');

    await app.listen(process.env.PORT || 3001);
}
void bootstrap();
