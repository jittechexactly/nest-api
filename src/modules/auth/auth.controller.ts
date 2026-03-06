import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import type { AuthResponse } from './interfaces/auth-response.interface';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
        const response = await this.authService.login(loginDto);
        return {
            message: "Login successful",
            accessToken: response,
            refreshToken: "sdjjsnds",
            tokenType: "Bearer",
            expiresIn: 900,
        };
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
        return {
            message: "Registration successful",
            accessToken: "hsufsjf",
            refreshToken: "sdjjsnds",
            tokenType: "Bearer",
            expiresIn: 900,
        };
    }
}
