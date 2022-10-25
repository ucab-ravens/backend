import { IsDefined, IsString } from "class-validator";

export class CreateCategoryDto {    
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsString()
    description: string;
}
