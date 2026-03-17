import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from '../dto/product.dto';
import { ResponseDto } from 'src/modules/response/dto/response.dto';
import { ProductService } from '../service/product.service';

@Controller('api/v1/product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Post('add')
    async saveProduct(@Body() createProductDto: CreateProductDto): Promise<ResponseDto> {
        return await this.productService.saveProduct(createProductDto);
    }
}
