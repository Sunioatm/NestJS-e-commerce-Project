// src/products/dto/create-product.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUrl, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
