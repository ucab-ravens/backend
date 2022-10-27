import { Factory } from "nestjs-seeder";
import { Lesson } from "src/module/lessons/entities/lesson.entity";
import { Category } from "src/module/categories/entities/category.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,
    UpdateDateColumn, 
    ManyToOne,
    OneToMany} from "typeorm";
import { Enrollment } from "src/module/enrollments/entities/enrollment.entity";

export enum CourseState {
    CREATED = 'created',
    PUBLISHED = 'published',
    SUSPENDED = 'suspended',
    DELETED = 'deleted'
}

@Entity('courses')
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Factory(faker => faker.lorem.words(3))
    @Column()
    title: string;

    @Factory(faker => faker.lorem.paragraphs(3))
    @Column()
    description: string;

    @ManyToOne(type => Category, category => category.courses)
    category: Category;

    @Factory(faker => faker.lorem.words(7).split(' '))
    @Column({ type: "text", array: true, nullable: true })
    keywords: string[];

    @Factory(faker => faker.helpers.arrayElement(
        [CourseState.CREATED, CourseState.PUBLISHED, 
        CourseState.SUSPENDED, CourseState.DELETED]))
    @Column({ type: "enum", enum: CourseState, 
        default: CourseState.CREATED })
    state: CourseState;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @OneToMany(type => Lesson, lesson => lesson.course)
    lessons: Lesson[];

    @OneToMany(type => Enrollment, enrollment => enrollment.course)
    enrollments: Enrollment[];
}
