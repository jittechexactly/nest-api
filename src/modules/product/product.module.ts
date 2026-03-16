import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ResponseModule } from '../response/response.module';
import { ProductService } from './service/product.service';

@Module({
  controllers: [ProductController],
  imports: [ResponseModule],
  providers: [ProductService]
})
export class ProductModule {}
