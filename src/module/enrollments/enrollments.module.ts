import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Course } from '../courses/entities/course.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Enrollment]),
    TypeOrmModule.forFeature([Course]),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService]
})
export class EnrollmentsModule {}
