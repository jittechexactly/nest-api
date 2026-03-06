import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import type { AuthResponse } from './interfaces/auth-response.interface';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponse } from './interfaces/register-response.interface';
import { EmailVerificationDto } from './dto/emailverification.dto';

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
    @HttpCode(201)
    async register(@Body() registerDto: RegisterDto): Promise<RegisterResponse> {
        return {
            message: "Registration successful",
            data: {
                name: registerDto.name,
                email: registerDto.email,
            }
        };
    }

    @Post('email-verification')
    async emailVerification(@Body() emailVerificationDto: EmailVerificationDto): Promise<AuthResponse> {
        return {
            message: "Email verification successful",
            accessToken: "hsufsjf",
            refreshToken: "sdjjsnds",
            tokenType: "Bearer",
            expiresIn: 900,
        };
    }
}
