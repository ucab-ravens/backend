import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Category } from "../../module/categories/entities/category.entity";
import { Seeder, DataFactory } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable() 
export class CategoriesSeeder implements Seeder {
    constructor(
        @InjectRepository(Category) private readonly repo: Repository<Category>) {}
    
    async seed(): Promise<any> {
        return await this.repo.insert(
            DataFactory.createForClass(Category).generate(100)
        )
    }

    async drop(): Promise<any> {
        return await this.repo.delete({});
    }    
}