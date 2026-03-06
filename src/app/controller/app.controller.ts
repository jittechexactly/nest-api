import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from '../service/app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('pages/index')
  getHello(): { name: string } {
    return this.appService.getHello();
  }
}
