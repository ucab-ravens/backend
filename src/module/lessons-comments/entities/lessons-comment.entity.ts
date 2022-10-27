import { Factory } from "nestjs-seeder";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "../../lessons/entities/lesson.entity";
import { User } from "../../users/entities/user.entity";

@Entity('lessons_comments')
export class LessonsComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Factory(faker => faker.random.words(5))
    @Column() 
    comment: string;

    @ManyToOne(type => Lesson, lesson => lesson.comments, 
        { onDelete: 'CASCADE' })
    lesson: Lesson;

    @ManyToOne(type => User, user => user.comments,
        { onDelete: 'CASCADE' })
    user: User;
}
