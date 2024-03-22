import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';
import { Role } from '../users.role.enum';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    readonly role: Role;

}