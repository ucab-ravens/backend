import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Req } from '@nestjs/common/decorators';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';

@Controller('lessons')
export class LessonsController {
    constructor(private readonly lessonsService: LessonsService) {}
  
    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() createLessonDto: CreateLessonDto) {
        return this.lessonsService.create(createLessonDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() request) {
        const lessons = await this.lessonsService.findAll();
        // if user is not admin or teacher show only
        // published lessons
        if (request.user.role !== UserRole.ADMIN 
        && request.user.role !== UserRole.TEACHER) {
        //return lessons.course.filter(lessons.course => lessons.course.state == 'published');///////////////////////
        }    
        return lessons;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Req() request, @Param('id') id: string) {
        const lesson = await this.lessonsService.findOne(+id);
        if (!lesson) 
        throw new NotFoundException('Lesson not found');
        // if user is not admin or teacher thorw
        // error if lesson is not published
        if (request.user.role !== UserRole.ADMIN
        && request.user.role !== UserRole.TEACHER
        //&& lesson.course.state !== 'published'/////////////////////////////////////////////////
        ) {
            throw new ForbiddenException('You are not allowed to access this lesson');
        }
        return lesson;
    }

    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
        return this.lessonsService.update(+id, updateLessonDto);
    }

    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.lessonsService.remove(+id);
    }
    
}
