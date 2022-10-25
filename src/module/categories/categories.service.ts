import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category) 
    private repo: Repository<Category>) { }

  async create(category: CreateCategoryDto) {
    return await this.repo.save(category);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({id});
  }

  async update(id: number, category: UpdateCategoryDto) {
    return await this.repo.update(id, category);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
