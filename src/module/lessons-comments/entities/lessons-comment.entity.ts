import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "../../lessons/entities/lesson.entity";
import { User } from "../../users/entities/user.entity";

@Entity('lessons_comments')
export class LessonsComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    comment: string;

    @ManyToOne(type => Lesson, lesson => lesson.comments)
    lesson: Lesson;

    @ManyToOne(type => User, user => user.comments)
    user: User;
}
