import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { EmailVerificationDto } from '../dto/emailverification.dto';
import { ResponseDto } from 'src/modules/response/dto/response.dto';
import type { Request, Response } from 'express';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<ResponseDto> {
        return this.authService.login(loginDto, res);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<RegisterResponse> {
        return this.authService.register(registerDto);
    }

    @Post('email-verification')
    async emailVerification(@Body() emailVerificationDto: EmailVerificationDto, @Res() res: Response): Promise<RegisterResponse> {
        return this.authService.emailVerification(emailVerificationDto, res);
    }

    @Post('auth-token')
    getAuthToken(@Req() req: Request, @Res() res: Response): Promise<ResponseDto>{
        return this.authService.getAuthToken(req, res);
    }
}
