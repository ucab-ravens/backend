import { Factory } from "nestjs-seeder";
import { Course } from "src/module/courses/entities/course.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Factory(faker => faker.lorem.word())
    @Column() 
    name: string;

    @Factory(faker => faker.lorem.paragraphs(1))
    @Column()
    description: string;

    @OneToMany(type => Course, course => course.category)
    courses: Course[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @CreateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
