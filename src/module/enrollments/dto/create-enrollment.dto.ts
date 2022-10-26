import {IsDefined, IsNotEmpty, IsNumber} from "class-validator"

export class CreateEnrollmentDto {

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  course_id: number;

}
