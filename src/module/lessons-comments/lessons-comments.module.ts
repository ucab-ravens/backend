import { Module } from '@nestjs/common';
import { LessonsCommentsService } from './lessons-comments.service';
import { LessonsCommentsController } from './lessons-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsComment } from './entities/lessons-comment.entity';
import { Lesson } from 'src/module/lessons/entities/lesson.entity';
import { User } from 'src/module/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonsComment]),
    TypeOrmModule.forFeature([Lesson]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [LessonsCommentsController],
  providers: [LessonsCommentsService]
})
export class LessonsCommentsModule {}
