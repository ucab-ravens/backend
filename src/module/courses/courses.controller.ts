import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Req } from '@nestjs/common/decorators';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() request) {
    const courses = await this.coursesService.findAll();
    // if user is not admin or teacher show only
    // published courses
    if (request.user.role !== UserRole.ADMIN 
      && request.user.role !== UserRole.TEACHER) {
      return courses.filter(course => course.state == 'published');
    }    
    return courses;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Req() request, @Param('id') id: string) {
    const course = await this.coursesService.findOne(+id);
    if (!course) 
      throw new NotFoundException('Course not found');
    // if user is not admin or teacher thorw
    // error if course is not published
    if (request.user.role !== UserRole.ADMIN
      && request.user.role !== UserRole.TEACHER
      && course.state !== 'published') {
        throw new ForbiddenException('You are not allowed to access this course');
    }
    return course;
  }

  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
