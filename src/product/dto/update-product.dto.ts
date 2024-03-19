import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly id: string;

    @IsString()
    @IsOptional()

    readonly name: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    readonly price: number;
}
