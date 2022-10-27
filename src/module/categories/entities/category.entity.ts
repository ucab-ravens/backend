import { Factory } from "nestjs-seeder";
import { Course } from "src/module/courses/entities/course.entity";
import { Lesson } from "src/module/lessons/entities/lesson.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Factory(faker => faker.random.word())
    @Column() 
    name: string;

    @Factory(faker => faker.random.words(10))
    @Column()
    description: string;

    @OneToMany(type => Course, course => course.category)
    courses: Course[];

    @OneToMany(type => Lesson, lesson => lesson.category)
    lessons: Lesson[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @CreateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
