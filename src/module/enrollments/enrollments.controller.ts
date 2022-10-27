import { Controller, Get, Post, Body, Patch, 
  Param, Delete, ForbiddenException, UseGuards, Req, ConflictException, UnauthorizedException } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { UserRole } from '../users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() request, @Body() createEnrollmentDto: CreateEnrollmentDto) {
    const user = request.user;

    if (user.role != UserRole.ADMIN && 
        user.id != createEnrollmentDto.user_id)
      throw new UnauthorizedException('You are not authorized to enroll this user');

    if (user.role != UserRole.ADMIN && 
        !user.is_active)
      throw new ForbiddenException('The user account is disabled');

    try {
      return await this.enrollmentsService.create(createEnrollmentDto);
    }
    catch (error) {
      throw new ConflictException('Already enrolled');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollmentsService.findOne(+id);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    try {
      return await this.enrollmentsService.update(+id, updateEnrollmentDto);
    }
    catch (error) {
      throw new ConflictException('Already enrolled');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() request, @Param('id') id: string) {
    const user = request.user;

    if (user.role != UserRole.ADMIN &&
        user.id != id)
      throw new UnauthorizedException('You are not authorized to unroll this user');

    return this.enrollmentsService.remove(+id);
  }
}
