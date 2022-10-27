import { PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import { IsArray, IsDefined, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { CourseState } from "../entities/course.entity";

export class UpdateCourseDto 
{
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    category_id: number;

    @IsOptional()
    @IsArray()
    keywords: string[];

    @IsOptional()
    @IsEnum(CourseState)
    state: CourseState;
}
