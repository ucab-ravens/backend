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
        // generate 100 lessons
        await this.lessonRepo.insert(
            DataFactory.createForClass(Lesson).generate(100)
        );

        // find all lessons with category = null
        // and assign them a random category
        const lessons = await this.lessonRepo.findBy({ category: null });
        // get random categories
        const categories = await this.categoryRepo.createQueryBuilder()
            .orderBy('RANDOM()').getMany();
        
            
        for (let i = 0; i < lessons.length; i++) {
            lessons[i].category = categories[i % categories.length];
            await this.lessonRepo.save(lessons[i]);
        }

        // find all lessons with course = null
        // and assign them a random course
        const lessons2 = await this.lessonRepo.findBy({ course: null });
        // get random courses
        const courses = await this.courseRepo.createQueryBuilder()
            .orderBy('RANDOM()').getMany();

        for (let i = 0; i < lessons2.length; i++) {
            lessons2[i].course = courses[i % courses.length];
            await this.lessonRepo.save(lessons2[i]);
        }
    }

    async drop(): Promise<any> {
        return await this.lessonRepo.delete({});
    }
}