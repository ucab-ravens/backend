import { IsDefined, IsNumber, IsString } from "class-validator";

export class CreateLessonDto {
    @IsDefined()
    @IsString()
    title: string;

    @IsDefined()
    @IsString()
    description: string;

    @IsDefined()
    @IsNumber()
    course_id: number;

    @IsDefined()
    @IsNumber()
    category_id: number;
    
}
