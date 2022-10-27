import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonsCommentDto } from './dto/create-lessons-comment.dto';
import { UpdateLessonsCommentDto } from './dto/update-lessons-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonsComment } from './entities/lessons-comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/module/users/entities/user.entity';
import { Lesson } from 'src/module/lessons/entities/lesson.entity';

@Injectable()
export class LessonsCommentsService {

  constructor(
    @InjectRepository(LessonsComment)
    private lessonsCommentsRepository: Repository<LessonsComment>,
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateLessonsCommentDto) {
    const lesson = await this.lessonsRepository.findOneBy({id: dto.lesson_id});
    const user = await this.usersRepository.findOneBy({id: dto.user_id});
    
    if (!lesson)
      throw new NotFoundException('Lesson not found');

    if (!user)
      throw new NotFoundException('User not found');

    delete user.password;

    const comment = this.lessonsCommentsRepository.create({
      comment: dto.comment,
      lesson: lesson,
      user: user,
    });

    return this.lessonsCommentsRepository.save(comment);
  }

  async findAll() {
    const comments = await this.lessonsCommentsRepository.find(
      {relations: ['user', 'lesson']}
    );
    comments.forEach(comment => {
      delete comment.user.password;
    });
    return comments;
  }

  async findOne(id: number) {
    const comment = await this.lessonsCommentsRepository.findOne(
      {where: {id}, relations: ['user', 'lesson']}
    );

    if (!comment)
      throw new NotFoundException('Comment not found');

    delete comment.user.password;  
    return comment;
  }

  async remove(id: number) {
    const comment = await this.lessonsCommentsRepository.findOneBy({id});
    if (!comment)
      throw new NotFoundException('Comment not found');
    return await this.lessonsCommentsRepository.delete(id);
  }

}
