import { IsOptional, IsString, MaxLength, MinLength, 
    IsEmail, Matches, IsBoolean, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    first_name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    last_name: string;

    @IsEmail() 
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password must have a uppercase, lowercase letter and a number'
    })
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @IsBoolean()
    is_active: boolean;
}
