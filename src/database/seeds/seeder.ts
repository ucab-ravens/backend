
import { TypeOrmModule } from "@nestjs/typeorm";
import { seeder } from "nestjs-seeder";
import { DatabaseModule } from "../database.module";
import { UsersSeeder } from "./user.seeder";
import { User } from "./../../module/users/entities/user.entity";
import { LessonsSeeder } from "./lesson.seeder";
import { Lesson } from "src/module/lessons/entities/lesson.entity";
import { Repository } from "typeorm";

seeder({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([User]), 
        TypeOrmModule.forFeature([Lesson])
    ],
    providers: [
        UsersSeeder, 
        LessonsSeeder
    ]
}).run([UsersSeeder, LessonsSeeder]);


/*
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmSeeder } from '@airhead/nest-typeorm-seeder';
import { DatabaseModule } from "../database.module";
import { UsersSeeder } from "./user.seeder";

TypeOrmSeeder.run({
  imports: [DatabaseModule],
  seeders: [UsersSeeder],
});
*/