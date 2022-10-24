
import { TypeOrmModule } from "@nestjs/typeorm";
import { seeder } from "nestjs-seeder";
import { DatabaseModule } from "../database.module";
import { UsersSeeder } from "./user.seeder";
import { User } from "./../../module/users/entities/user.entity";
import { Repository } from "typeorm";

seeder({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([User])
    ],
    providers: [
        UsersSeeder
    ]
}).run([UsersSeeder]);


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