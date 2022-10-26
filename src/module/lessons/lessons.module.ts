import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Category } from '../categories/entities/category.entity';
import { Course } from '../courses/entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson]), 
    TypeOrmModule.forFeature([Course]), /////
    TypeOrmModule.forFeature([Category])
  ],
  controllers: [LessonsController],
  providers: [LessonsService]
})
export class LessonsModule {}
