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
        
    }

    async drop(): Promise<any> {
        return await this.enrollRepo.delete({});
    }
}