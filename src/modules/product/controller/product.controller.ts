import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from '../dto/product.dto';
import { ResponseDto } from 'src/modules/response/dto/response.dto';

@Controller('api/v1/product')
export class ProductController {

    @Post('add')
    async saveProduct(@Body() createProductDto: CreateProductDto): Promise<any> {
        return "hello";
    }
}
