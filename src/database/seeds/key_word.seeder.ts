import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Key_Word } from "../../module/key_words/entities/key_word.entity";
import { Seeder, DataFactory } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable() 
export class LessonsSeeder implements Seeder {
    constructor(
        @InjectRepository(Key_Word) private readonly repo: Repository<Key_Word>) {}
    
    async seed(): Promise<any> {
        return this.repo.insert(
            DataFactory.createForClass(Key_Word).generate(100)
        )
    }

    async drop(): Promise<any> {
        return this.repo.delete({});
    }
}