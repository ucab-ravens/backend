import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../../module/users/entities/user.entity";
import { Seeder, DataFactory } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable() 
export class UsersSeeder implements Seeder {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>) {}
    
    async seed(): Promise<any> {
        return await this.repo.insert(
            DataFactory.createForClass(User).generate(100)
        )
    }

    async drop(): Promise<any> {
        return await this.repo.delete({});
    }
}