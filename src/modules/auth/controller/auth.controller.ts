import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { EmailVerificationDto } from '../dto/emailverification.dto';
import { ResponseDto } from 'src/modules/response/dto/response.dto';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<ResponseDto> {
        return this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<RegisterResponse> {
        return this.authService.register(registerDto);
    }

    @Post('email-verification')
    async emailVerification(@Body() emailVerificationDto: EmailVerificationDto): Promise<RegisterResponse> {
        return this.authService.emailVerification(emailVerificationDto);
    }
}
