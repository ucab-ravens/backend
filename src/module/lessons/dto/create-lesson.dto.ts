import { IsDefined, IsString } from "class-validator";

export class CreateLessonDto {
    @IsDefined()
    @IsString()
    title: string;

    @IsDefined()
    @IsString()
    description: string;
}
