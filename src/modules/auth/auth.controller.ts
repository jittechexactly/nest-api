import { Body, Controller, Get } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import type { AuthResponse } from './interfaces/auth-response.interface';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('login')
    async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
        const response = await this.authService.login(loginDto);
        return {
            accessToken: response,
            refreshToken: "sdjjsnds",
            tokenType: "Bearer",
            expiresIn: 900,
        };
    }
}
