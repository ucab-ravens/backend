import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Lesson } from "../../module/lessons/entities/lesson.entity";
import { Seeder, DataFactory } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/module/categories/entities/category.entity";
import { Course } from "src/module/courses/entities/course.entity";
import { LessonsComment } from "src/module/lessons-comments/entities/lessons-comment.entity";
import { User } from "src/module/users/entities/user.entity";

@Injectable() 
export class LessonsCommentsSeeder implements Seeder {
    constructor(
        @InjectRepository(LessonsComment) private readonly commRepo: Repository<LessonsComment>,
        @InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ) {}
    
    async seed(): Promise<any> {
        // generate 400 comments 
        await this.commRepo.insert(
            DataFactory.createForClass(LessonsComment).generate(400)
        );

        // find all comments with lesson = null
        // and assign them a random lesson
        const comments = await this.commRepo.findBy({ lesson: null });
        // get random lessons
        const lessons = await this.lessonRepo.createQueryBuilder()
            .orderBy('RANDOM()').getMany();

        for (let i = 0; i < comments.length; i++) {
            comments[i].lesson = lessons[i % lessons.length];
            await this.commRepo.save(comments[i]);
        }

        // find all comments with user = null
        // and assign them a random user
        const comments2 = await this.commRepo.findBy({ user: null });
        // get random users
        const users = await this.userRepo.createQueryBuilder()
            .orderBy('RANDOM()').getMany();

        for (let i = 0; i < comments2.length; i++) {
            comments2[i].user = users[i % users.length];
            await this.commRepo.save(comments2[i]);
        }
    }

    async drop(): Promise<any> {
        return await this.commRepo.delete({});
    }
}