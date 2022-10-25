import { Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class CoursesService {
  
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const category = await this.categoryRepository
      .findOneBy({id: createCourseDto.category_id});

    if (!category) 
      throw new NotFoundException('Category not found');

    const course = this.courseRepository.create({
      ...createCourseDto,
      category,
    });

    return await this.courseRepository.save(course);
  }

  async findAll() {
    return await this.courseRepository.find({relations: ['category']});
  }

  async findOne(id: number) {
    return this.courseRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const category = await this.categoryRepository
    .findOneBy({id: updateCourseDto.category_id});

  if (!category) 
    throw new NotFoundException('Category not found');

    const course = this.courseRepository.create({
      ...updateCourseDto,
      category,
    });

    return await this.courseRepository.update(id, course);
    }

    async remove(id: number) {
      return await this.courseRepository.delete(id);
    }
}
