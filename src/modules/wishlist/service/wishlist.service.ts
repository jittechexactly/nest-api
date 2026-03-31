import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/modules/product/service/product.service';
import { ResponseDto } from 'src/modules/response/dto/response.dto';
import { ResponseService } from 'src/modules/response/service/response.service';

@Injectable()
export class WishlistService {

    constructor(private readonly responseService: ResponseService, 
        private readonly productService: ProductService) {
    }

    async addToWishlist(id: number): Promise<any> {

    }
}
