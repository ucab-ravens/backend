import { IsArray, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLessonDto {
    @IsDefined()
    @IsString()
    title: string;

    @IsDefined()
    @IsString()
    description: string;

    @IsOptional()
    @IsArray()
    keywords: string[];

    @IsDefined()
    @IsNumber()
    course_id: number;

    @IsDefined()
    @IsNumber()
    category_id: number;
    
}
