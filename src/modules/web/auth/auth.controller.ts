import { Controller, Get, Render } from '@nestjs/common';

@Controller('web/auth')
export class AuthController {

    @Get('register')
    @Render('pages/auth/register')
    register() { }
}
