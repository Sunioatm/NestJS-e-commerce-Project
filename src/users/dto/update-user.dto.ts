import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    readonly username: string;

    @IsString()
    @IsOptional()
    readonly password: string;

}
