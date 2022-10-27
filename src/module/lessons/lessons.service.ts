import { Injectable } from '@nestjs/common';
import { Lesson } from './entities/lesson.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class LessonsService {
  
    constructor(
        @InjectRepository(Lesson)
        private readonly lessonRepository: Repository<Lesson>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    async create(createLessonDto: CreateLessonDto) {
        const course = await this.courseRepository
            .findOneBy({id: createLessonDto.course_id});
            
        const category = await this.categoryRepository
            .findOneBy({id: createLessonDto.category_id});
            
        if (!course) 
            throw new NotFoundException('Course not found');
        if (!category) 
            throw new NotFoundException('Category not found');

        const lesson = this.lessonRepository.create({
            ...createLessonDto,
            category,
            course
        });

        return await this.lessonRepository.save(lesson);
    }

    async findAll() {
        return await this.lessonRepository.find({relations: ['category', 'course', 'comments']});
    }

    async findOne(id: number) {
        return await this.lessonRepository.findOne({
            where: { id },
            relations: ['category', 'course', 'comments'],
        });
    }

    async update(id: number, updateLessonDto: UpdateLessonDto) {
        const category = await this.categoryRepository
            .findOneBy({id: updateLessonDto.category_id});

        const course = await this.courseRepository
            .findOneBy({id: updateLessonDto.course_id});

        if (!category) 
            throw new NotFoundException('Category not found');

        if (!course)
            throw new NotFoundException('Course not found');

        const lesson = this.lessonRepository.create({
            ...updateLessonDto,
            category,
            course
        });

        return await this.lessonRepository.update(id, lesson);
    }

    async remove(id: number) {
        return await this.lessonRepository.delete(id);
    }
}
