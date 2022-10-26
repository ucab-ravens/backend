import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Category } from '../categories/entities/category.entity';
import { Lesson } from '../lessons/entities/lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]), 
    TypeOrmModule.forFeature([Category]),
    /////TypeOrmModule.forFeature([Lesson]),/////////////////////////////////////////////////
  ],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
