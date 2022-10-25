import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Factory } from "nestjs-seeder";

@Entity('lessons')
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Factory(faker => faker.random.words())
    @Column()
    title: string;

    @Factory(faker => faker.random.words())
    @Column()
    description: string;
}
