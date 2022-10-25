import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Lesson } from "../../module/lessons/entities/lesson.entity";
import { Seeder, DataFactory } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable() 
export class LessonsSeeder implements Seeder {
    constructor(
        @InjectRepository(Lesson) private readonly repo: Repository<Lesson>) {}
    
    async seed(): Promise<any> {
        return this.repo.insert(
            DataFactory.createForClass(Lesson).generate(100)
        )
    }

    async drop(): Promise<any> {
        return this.repo.delete({});
    }
}