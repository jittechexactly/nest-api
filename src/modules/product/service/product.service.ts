import { Injectable } from "@nestjs/common";
import { ResponseDto } from "src/modules/response/dto/response.dto";
import { CreateProductDto } from "../dto/product.dto";
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
            productDescription: createProductDto.description
        });

        const savedProduct = await this.productRepository.save(newProduct);

        if (!savedProduct) {
            return this.responseService.response(false, "Something went wrong for creating a new product!", {});
        }

        return this.responseService.response(true, "Product created successfully!", savedProduct);
    }
}