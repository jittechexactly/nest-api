import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ResponseModule } from '../response/response.module';
import { ProductService } from './service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './repository/product.entity';
import { WishlistModule } from '../wishlist/wishlist.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),ResponseModule, WishlistModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductModule]
})
export class ProductModule {}
