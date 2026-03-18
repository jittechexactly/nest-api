import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { ResponseDto } from 'src/modules/response/dto/response.dto';
import { ProductService } from '../service/product.service';
import { Product } from '../interfaces/product.interface';
import { Roles } from 'src/modules/auth/decorators/role.decorator';
import { UserRoleEnum } from 'src/modules/users/enum/userRole.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('api/v1/product')
export class ProductController implements Product {
    constructor(private readonly productService: ProductService){}

    @Post('add')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRoleEnum.VENDOR, UserRoleEnum.ADMIN)
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
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRoleEnum.VENDOR, UserRoleEnum.ADMIN)
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<ResponseDto>{
        return await this.productService.updateProduct(id, updateProductDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRoleEnum.VENDOR)
    async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto>{
        return await this.productService.deleteProduct(id);
    }
}
