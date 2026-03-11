import { Injectable } from '@nestjs/common';
import { Product } from 'src/modules/product/interfaces/product.interface';

@Injectable()
export class AppService {

  getHello(): { data: Product[] } {
  return {
    data: [
      {
        id: 1,
        productName: "Demo 1",
        description: "Demo Description",
        img_url: "/public/images/main-bg.jpg"
      },
      {
        id: 2,
        productName: "Demo 2",
        description: "Demo Description",
        img_url: "/public/images/main-bg.jpg"
      },
      {
        id: 3,
        productName: "Demo 3",
        description: "Demo Description",
        img_url: "/public/images/main-bg.jpg"
      }
    ]
  };
}
}
