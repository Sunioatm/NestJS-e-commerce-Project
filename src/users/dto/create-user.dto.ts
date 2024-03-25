// src/users/dto/create-user.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { Role } from '../role.enum'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
