import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Lesson } from './entities/lesson.entity';
import { Category } from '../categories/entities/category.entity';
import { Course } from '../courses/entities/course.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Course]), 
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([Lesson]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService]
})
export class LessonsModule {}
