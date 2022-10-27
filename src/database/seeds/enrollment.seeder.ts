import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Lesson } from "../../module/lessons/entities/lesson.entity";
import { Seeder, DataFactory } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/module/categories/entities/category.entity";
import { Course } from "src/module/courses/entities/course.entity";
import { Enrollment } from "src/module/enrollments/entities/enrollment.entity";
import { User } from "src/module/users/entities/user.entity";

@Injectable() 
export class EnrollmentsSeeder implements Seeder {
    constructor(
        @InjectRepository(Enrollment) private readonly enrollRepo: Repository<Enrollment>,
        @InjectRepository(Course) private readonly courseRepo: Repository<Course>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) {}        
    
    async seed(): Promise<any> {
        const courses = await this.courseRepo.find();
        const users = await this.userRepo.find();

        for (let i = 0; i < courses.length; i++) {
            const course = courses[i];
            
            // random 5 ... 30
            const count = Math.floor(Math.random() * 25) + 5;

            for (let j = 0; j < count; j++) {
                const user = users[j];
                const enrollment = new Enrollment();
                enrollment.course = course;
                enrollment.user = user;
                await this.enrollRepo.save(enrollment);
            }
        }
    }

    async drop(): Promise<any> {
        //return await this.enrollRepo.delete({});
    }
}