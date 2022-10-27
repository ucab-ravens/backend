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
import { Query } from '@nestjs/common/decorators';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { CourseState } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService,
    private mailService: MailerService
    ) {}
  
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() request, @Query() query) {
    let courses = [];
 
    if (query.search && query.search_by) {
      
      if (query.search_by === 'keyword')
        courses = await this.coursesService.searchByKeyword(query.search);      
      else if (query.search_by === 'category') 
        courses = await this.coursesService.searchByCategory(query.search);  
    } 
    else if (query.search) {
      courses = await this.coursesService.search(query.search);
    }
    else {
      courses = await this.coursesService.findAll();
    }
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
  async update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    const course = await this.coursesService.findOne(+id);
    
    if (!course)
      throw new NotFoundException('Course not found');    

    const result = await this.coursesService.update(+id, dto);

    if (result && result.affected > 0 && 
        (dto.state === CourseState.SUSPENDED || 
        dto.state === CourseState.DELETED)
      ) {
      
      // console.log(timestamp + info: + sending notification email)
      console.log('info: sending notification email');
      // find all students enrolled in this course
      const students = await this.coursesService.findStudentsByCourse(+id);

      // map deleted and suspended to eliminado and suspendido
      const state = dto.state === CourseState.SUSPENDED ? 'suspendido' : 'eliminado';
      // send email to all students
      students.forEach(student => {
        this.mailService.sendMail({
          to: student.email,
          from: 'neeriok@gmail.com',
          subject: 'El estado del curso ha cambiado - CORSI',
          html: `<p>El estado del curso <b>${course.title}</b> ha cambiado a ${state}</p>`,
        });
      });
    }    
    return result;
  }

  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
