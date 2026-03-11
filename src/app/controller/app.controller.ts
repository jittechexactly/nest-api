import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Product } from 'src/modules/product/interfaces/product.interface';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('pages/index')
  getHello(): { data: Product[] } {
    return this.appService.getHello();
  }
}
