/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { GraphQLFormattedError } from 'graphql';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';

config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            synchronize: true,
            ssl: true,
            extra: {
                ssl: {
                    rejectUnauthorized: false,
                },
            },
            autoLoadEntities: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            context: ({ req, res }) => ({ req, res }),
            sortSchema: true,
            playground: true,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatError: (error: any): GraphQLFormattedError => {
                const message =
                    error.extensions?.originalError?.message ||
                    error.message ||
                    'Unexpected error occurred';

                return {
                    message,
                    path: Array.isArray(error.path) ? error.path : undefined,
                    extensions: error.extensions ? error.extensions : undefined,
                };
            },
        }),
        AuthModule,
        UserModule,
        EventModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
