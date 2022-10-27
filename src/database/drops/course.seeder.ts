import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Course } from "src/module/courses/entities/course.entity";
import { Category } from "src/module/categories/entities/category.entity";
import { Seeder, DataFactory } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable() 
export class CoursesSeeder implements Seeder {
    constructor(
        @InjectRepository(Course) private readonly courseRepo: Repository<Course>,
        @InjectRepository(Category) private readonly categoryRepo: Repository<Category>
    ) {}
    
    async seed(): Promise<any> {
        
    }

    async drop(): Promise<any> {
        return await this.courseRepo.delete({});
    }
}