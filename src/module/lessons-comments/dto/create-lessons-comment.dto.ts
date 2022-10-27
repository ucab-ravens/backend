import { IsDefined, IsNumber, IsString } from "class-validator";

export class CreateLessonsCommentDto {
    @IsDefined()
    @IsString() 
    comment: string;

    @IsDefined()
    @IsNumber() 
    lesson_id: number;

    @IsDefined()
    @IsNumber()
    user_id: number;
}
