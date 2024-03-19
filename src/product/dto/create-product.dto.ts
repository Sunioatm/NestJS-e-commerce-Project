import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    readonly price: number;
}