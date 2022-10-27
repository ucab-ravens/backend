import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course, CourseState } from '../courses/entities/course.entity';
import { User } from '../users/entities/user.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './entities/enrollment.entity';

@Injectable()
export class EnrollmentsService {

  constructor(
    @InjectRepository(Enrollment) 
    private readonly enrollmentRepository: Repository<Enrollment>, 
    @InjectRepository(Course) 
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>){}

  async create(createEnrollmentDto: CreateEnrollmentDto) { 
    const {user_id, course_id} = createEnrollmentDto;

    const user = await this.userRepository.findOneBy({id: user_id});
    const course = await this.courseRepository.findOneBy({id: course_id});

    if (!user || !course){
      throw new NotFoundException('User or course not found');
    }

    if (course.state != CourseState.PUBLISHED){
      throw new ForbiddenException('The course is not published');
    }

    delete user.password;

    const enrollment = await this.enrollmentRepository.create({
      user,
      course
    });

    return await this.enrollmentRepository.save(enrollment);
  }

  async findAll() {
    const enrollments = await this.enrollmentRepository.find({
        relations: ['user','course']
    });

    enrollments.forEach(enrollment => {
      delete enrollment.user.password;
    });
    
    return enrollments;
  }

  async findOne(id: number) {
    const enrollment = await this.enrollmentRepository.findOne({
      where: {id},
      relations: ['user','course']
    });

    if (!enrollment){
      throw new NotFoundException('Enrollment not found');
    }

    delete enrollment.user.password;
    return enrollment;
  }

  async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    const { user_id, course_id} = updateEnrollmentDto;

    const user = await this.userRepository.findOneBy({id: user_id});
    const course = await this.courseRepository.findOneBy({id: course_id});

    if (!user || !course){
      throw new NotFoundException('User or course not found');
    }

    return await this.enrollmentRepository.update(
      id,
      { user, course}
    );
  }

  async remove(id: number) {
    return await this.enrollmentRepository.delete(id);
  }
}
