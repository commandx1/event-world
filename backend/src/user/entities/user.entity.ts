import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
        id: number;

    @Field()
    @Column({ unique: true })
        email: string;

    @Column()
        password: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
        name?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
        avatar?: string;

    @Field(() => Date)
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
        createdAt: Date;
} 