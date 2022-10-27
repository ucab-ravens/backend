import { Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { Category } from '../categories/entities/category.entity';import { Lesson } from '../lessons/entities/lesson.entity';/////////////////////////////////////
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';
import { User } from '../users/entities/user.entity';

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
    return await this.courseRepository.find({relations: ['category', 'lessons']});
  }
  
  async search(search: string) {
    return await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.lessons', 'lessons')
      .where('LOWER(course.title) LIKE :search', { search: `%${search.toLowerCase()}%` })
      .orWhere('LOWER(course.description) LIKE :search', { search: `%${search.toLowerCase()}%` })
      .orWhere('LOWER(array[course.keywords]::text) LIKE :search', { search: `%${search.toLowerCase()}%` })
      .orWhere('LOWER(category.name) LIKE :search', { search: `%${search.toLowerCase()}%` })
      .getMany();
  }

  async searchByKeyword(search: string) {
    return await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.lessons', 'lessons')
      .where('LOWER(array[course.keywords]::text) LIKE :search', { search: `%${search.toLowerCase()}%` })
      .getMany();
  }

  async searchByCategory(search: string) {
    return await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.lessons', 'lessons')
      .where('LOWER(category.name) LIKE :search', { search: `%${search.toLowerCase()}%` })
      .getMany();
  }

  async findOne(id: number) {
    const course =  await this.courseRepository.findOne({
      where: { id },
      relations: {
        category: true,
        lessons: true,
      },
    });

    if (!course)
      throw new NotFoundException('Course not found');

    return {
      ...course,
      users: await this.findStudentsByCourse(id)
    }
  }

  async findStudentsByCourse(id: number): Promise<User[]> {
    // use enrollments
    // use query builder
    const users = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.enrollments', 'enrollments')
      .leftJoinAndSelect('enrollments.user', 'user')
      .where('course.id = :id', { id })
      .getOne()
      .then(course => course.enrollments.map(enrollment => enrollment.user));

    // remove password
    return users.map(user => {
      delete user.password;
      return user;
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
