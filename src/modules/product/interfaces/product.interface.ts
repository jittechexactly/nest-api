import { ResponseDto } from "src/modules/response/dto/response.dto";
import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";

export interface Product {
    saveProduct(createProductDto: CreateProductDto): Promise<ResponseDto>;
    allProducts(): Promise<ResponseDto>;
    updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<ResponseDto>;
    deleteProduct(id: number): Promise<void>;
    getProduct(id: number): Promise<ResponseDto>;
}