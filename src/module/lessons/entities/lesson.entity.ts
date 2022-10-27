import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Factory } from "nestjs-seeder";
import { Category } from 'src/module/categories/entities/category.entity';
import { Course } from 'src/module/courses/entities/course.entity';
import { LessonsComment } from 'src/module/lessons-comments/entities/lessons-comment.entity';

@Entity('lessons')
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Factory(faker => faker.random.words(4))
    @Column()
    title: string;

    @Factory(faker => faker.random.words(10))
    @Column()
    description: string;

    @ManyToOne(type => Course, course => course.lessons)
    course: Course;

    @ManyToOne(type => Category, category => category.courses)
    category: Category;

    @Factory(faker => faker.lorem.words(7).split(' '))
    @Column({ type: "text", array: true, nullable: true })
    keywords: string[];

    @OneToMany(type => LessonsComment, comment => comment.lesson)
    comments: LessonsComment[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
    
}
