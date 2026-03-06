import { Controller, Get } from '@nestjs/common';

@Controller('web/auth')
export class AuthController {

    @Get('register')
    register() {
        return "Register Page running!";
    }
}
