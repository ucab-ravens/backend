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
    async findAll() {
        return await this.lessonsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.lessonsService.findOne(+id);
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
