
import { TypeOrmModule } from "@nestjs/typeorm";
import { seeder } from "nestjs-seeder";
import { DatabaseModule } from "../database.module";
import { UsersSeeder } from "./user.seeder";
import { User } from "../../module/users/entities/user.entity";
import { LessonsSeeder } from "./lesson.seeder";
import { Lesson } from "src/module/lessons/entities/lesson.entity";
import { Repository } from "typeorm";
import { Category } from "src/module/categories/entities/category.entity";
import { CategoriesSeeder } from "./category.seeder";
import { Enrollment } from "src/module/enrollments/entities/enrollment.entity";
import { Course } from "src/module/courses/entities/course.entity";
import { LessonsComment } from "src/module/lessons-comments/entities/lessons-comment.entity";
import { CoursesSeeder } from "./course.seeder";
import { EnrollmentsSeeder } from "./enrollment.seeder";
import { LessonsCommentsSeeder } from "./lesson-comment.seeder";

seeder({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([
            User,
            Course, 
            Category, 
            Lesson,
            Enrollment,
            LessonsComment, 
        ])
    ],
    providers: [
        UsersSeeder, 
        CategoriesSeeder,
        CoursesSeeder,
        LessonsSeeder,
        EnrollmentsSeeder,
        LessonsCommentsSeeder
    ]
}).run([
    UsersSeeder,
    CategoriesSeeder,
    CoursesSeeder,
    LessonsSeeder,
    LessonsCommentsSeeder,
    EnrollmentsSeeder
]);