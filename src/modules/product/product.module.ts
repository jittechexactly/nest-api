import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ResponseModule } from '../response/response.module';
import { ProductService } from './service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './repository/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),ResponseModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
