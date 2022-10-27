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
        
    }

    async drop(): Promise<any> {
        return await this.commRepo.delete({});
    }
}