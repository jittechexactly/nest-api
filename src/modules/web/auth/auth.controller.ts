import { Controller, Get, Render } from '@nestjs/common';

@Controller('web/auth')
export class AuthController {

    @Get('register')
    @Render('pages/auth/register')
    register() { }

    @Get('login')
    @Render('pages/auth/login')
    login() { }

    @Get('email-verification')
    @Render('pages/auth/email-verification')
    emailVerification() { }
}
