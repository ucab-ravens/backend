import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';
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

    return await this.enrollmentRepository.create({
      user,
      course
    });
  }

  async findAll() {
    return await this.enrollmentRepository.find();
  }

  async findOne(id: number) {
    return await this.enrollmentRepository.findOne({where: {id}});
  }

  async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    const { user_id, course_id} = updateEnrollmentDto;

    const user = await this.userRepository.findOneBy({id: user_id});
    const course = await this.courseRepository.findOneBy({id: course_id});

    if (!user || !course){
      throw new NotFoundException('User or course not found');
    }

    return await this.enrollmentRepository.update(id,{
      user,course});
  }

  async remove(id: number) {
    return await this.enrollmentRepository.delete(id);
  }
}
