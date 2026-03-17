import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { ResponseDto } from 'src/modules/response/dto/response.dto';
import { ProductService } from '../service/product.service';
import { Product } from '../interfaces/product.interface';

@Controller('api/v1/product')
export class ProductController implements Product {
    constructor(private readonly productService: ProductService){}

    @Post('add')
    async saveProduct(@Body() createProductDto: CreateProductDto): Promise<ResponseDto> {
        return await this.productService.saveProduct(createProductDto);
    }

    @Get('all')
    async allProducts(): Promise<ResponseDto>{
        return await this.productService.allProducts();
    }

    @Get(':id')
    async getProduct(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto>{
        return await this.productService.fetchProductById(id);
    }

    @Put('update/:id')
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<ResponseDto>{
        return await this.productService.updateProduct(id, updateProductDto);
    }

    @Delete(':id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto>{
        return await this.productService.deleteProduct(id);
    }
}
