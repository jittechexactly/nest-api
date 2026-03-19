import { HttpException, HttpStatus, Injectable, ParseIntPipe } from "@nestjs/common";
import { ResponseDto } from "src/modules/response/dto/response.dto";
import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";
import { ResponseService } from "src/modules/response/service/response.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../repository/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        private readonly responseService: ResponseService,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }


    async saveProduct(createProductDto: CreateProductDto): Promise<ResponseDto> {
        const newProduct = this.productRepository.create({
            productName: createProductDto.name,
            productCategory: createProductDto.category,
            stock: createProductDto.stock,
            productImage: createProductDto.imageUrl,
            productDescription: createProductDto.description,
            price: createProductDto.price
        });

        const savedProduct = await this.productRepository.save(newProduct);

        if (!savedProduct) {
            return this.responseService.response(false, "Something went wrong for creating a new product!", {});
        }

        return this.responseService.response(true, "Product created successfully!", savedProduct);
    }

    async allProducts(): Promise<ResponseDto> {
        const allProducts = await this.productRepository.find({
            order: {
                createdAt: 'DESC',
            },
        });

        if (!allProducts) {
            throw new HttpException(
                this.responseService.response(false, "Products not found", {}),
                HttpStatus.NOT_FOUND
            );
        }

        return this.responseService.response(true, "All products fetched successfully!", allProducts);
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<ResponseDto> {
        const product = await this.fetchProductById(id);

        Object.assign(product.data, updateProductDto);

        await this.productRepository.save(product.data);

        return this.responseService.response(
            true,
            "Product updated successfully!",
            product
        );
    }

    async fetchProductById(id: number): Promise<ResponseDto> {
        const product = await this.productRepository.findOne({
            where: { id }
        });

        if (!product) {
            throw new HttpException(
                this.responseService.response(false, "Product not found!", {}),
                HttpStatus.NOT_FOUND
            );
        }

        return this.responseService.response(true, "Product fetched successfully!", product);
    }

    async deleteProduct(id: number): Promise<ResponseDto> {
        const product = await this.fetchProductById(id);

        await this.productRepository.remove(product.data);

        return this.responseService.response(
            true,
            "Product deleted successfully!",
            {}
        );
    }
}