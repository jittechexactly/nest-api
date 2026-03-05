import { Body, Controller, Get } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import type { AuthResponse } from './interfaces/auth-response.interface';

@Controller('auth')
export class AuthController {

    @Get('login')
    login(@Body() loginDto: LoginDto): AuthResponse {
        return {
            accessToken: "hjdhdd",
            refreshToken: "sdjjsnds",
            tokenType: "Bearer",
            expiresIn: 900,
        };
    }
}
