import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';

export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    readonly identifier: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}