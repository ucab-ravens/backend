import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LessonsCommentsService } from './lessons-comments.service';
import { CreateLessonsCommentDto } from './dto/create-lessons-comment.dto';
import { UpdateLessonsCommentDto } from './dto/update-lessons-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ForbiddenException } from '@nestjs/common';
import { UserRole } from '../users/entities/user.entity';

@Controller('lessons-comments')
export class LessonsCommentsController {
  constructor(private readonly lessonsCommentsService: LessonsCommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() request, @Body() dto: CreateLessonsCommentDto) {
    
    const user = request.user;
    if (user.role !== UserRole.ADMIN 
      && user.id !== dto.user_id) 
        throw new UnauthorizedException('You are not allowed to comment as this user');
    
    if (user.role !== UserRole.ADMIN && !user.is_active) 
        throw new ForbiddenException('The user account is disabled');
    
    return this.lessonsCommentsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.lessonsCommentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsCommentsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Req() request, @Param('id') id: string) {
    const user = request.user;
    const comment = await this.lessonsCommentsService.findOne(+id);

    if (!comment || !comment.user)
      throw new NotFoundException('Comment not found');

    if (user.role !== UserRole.ADMIN 
      && user.id !== comment.user.id) 
        throw new UnauthorizedException('You are not allowed to comment as this user');
    
    if (user.role !== UserRole.ADMIN && !user.is_active) 
        throw new ForbiddenException('The user account is disabled');

    return await this.lessonsCommentsService.remove(+id);
  }
}
