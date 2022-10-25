import { IsArray, IsDefined, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { CourseState } from "../entities/course.entity";

export class CreateCourseDto {
    @IsDefined()
    @IsString()
    title: string;

    @IsDefined()
    @IsString()
    description: string;

    @IsDefined()
    @IsNumber()
    category_id: number;

    @IsOptional()
    @IsArray()
    keywords: string[];

    @IsDefined()
    @IsEnum(CourseState)
    state: CourseState;
}
