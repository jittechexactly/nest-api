import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional, IsUrl, Min, IsEnum } from 'class-validator';
import { ProductCategoryEnum } from '../enum/product.enum';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsEnum(ProductCategoryEnum)
    @IsNotEmpty()
    category: ProductCategoryEnum;

    @IsUrl()
    @IsOptional()
    imageUrl?: string;
}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    stock?: number;

    @IsString()
    @IsOptional()
    category?: string;

    @IsUrl()
    @IsOptional()
    imageUrl?: string;
}