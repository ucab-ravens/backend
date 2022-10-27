import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Lesson } from "../../module/lessons/entities/lesson.entity";
import { Seeder, DataFactory } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/module/categories/entities/category.entity";
import { Course } from "src/module/courses/entities/course.entity";

@Injectable() 
export class LessonsSeeder implements Seeder {
    constructor(
        @InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>,
        @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
        @InjectRepository(Course) private readonly courseRepo: Repository<Course>,
    ) {}        
    
    async seed(): Promise<any> {
        
    }

    async drop(): Promise<any> {
        return await this.lessonRepo.delete({});
    }
}