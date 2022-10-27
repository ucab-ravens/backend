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
        await this.courseRepo.insert(
            DataFactory.createForClass(Course).generate(20)
        )

        // find all courses with category = null 
        // and assign them a random category
        const courses = await this.courseRepo.findBy({ category: null });
        //r random categories
        const categories = await this.categoryRepo.createQueryBuilder()
            .orderBy('RANDOM()').getMany();
        
        for (let i = 0; i < courses.length; i++) {
            courses[i].category = categories[i % categories.length];
            await this.courseRepo.save(courses[i]);
        }
    }

    async drop(): Promise<any> {
        //return await this.courseRepo.delete({});
    }
}