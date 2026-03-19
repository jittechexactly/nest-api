import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth-service.interface';
import { RegisterDto } from '../dto/register.dto';
import { UsersService } from 'src/modules/users/service/users.service';
import { LoginDto } from '../dto/login.dto';
import { Resend } from 'resend';
import { EmailVerificationDto } from '../dto/emailverification.dto';
import { ResponseService } from 'src/modules/response/service/response.service';
import { ResponseDto } from 'src/modules/response/dto/response.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
    private resend = new Resend(process.env.RESEND_API_KEY);
    constructor(private userService: UsersService, private readonly responseService: ResponseService, private readonly jwtService: JwtService) { }

    async register(registerDto: RegisterDto): Promise<ResponseDto> {
        const user = await this.userService.createUser(registerDto);

        await this.sendEmail(registerDto.email, registerDto.name, user.emailOtp);
        const { id, name, email } = user;

        return this.responseService.response(true, "Registration Successful!", { id, name, email });
    }

    async emailVerification(emailverificationDto: EmailVerificationDto, res: Response): Promise<ResponseDto> {
        const otpVerificationDetails = await this.userService.emailVerification(emailverificationDto);
        if (otpVerificationDetails) {
            return await this.userService.accessTokenGenerate(otpVerificationDetails, res);
        }

        throw new HttpException(
            this.responseService.response(false, "Invalid OTP or expired!", {}),
            HttpStatus.UNAUTHORIZED
        );
    }

    async login(loginDto: LoginDto, res: Response): Promise<ResponseDto> {
        return await this.userService.loginUser(loginDto, res);
    }

    private async sendEmail(email: string, name: string, otp: number): Promise<void> {
        const { error } = await this.resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['jit.techexactly@gmail.com'],
            subject: 'Welcome to Acme!',
            html: `<h1>Welcome, ${name}!</h1><p>Your registration was successful. Your OTP is ${otp}</p>`,
        });

        if (error) {
            console.error('Failed to send registration email:', error);
            throw new HttpException(
                this.responseService.response(false, "Something went wrong!", {}),
                HttpStatus.BAD_REQUEST
            );
        }

    }

    async getAuthToken(request: Request, res: Response): Promise<ResponseDto> {
        const token = request.cookies?.refresh_token;
        if (!token) {
            throw new HttpException(
                this.responseService.response(false, "Login expired", {}),
                HttpStatus.UNAUTHORIZED
            );
        }

        const user = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET,
        });

        return await this.userService.accessTokenGenerate({
            id: user.sub,
            email: user.email,
            role: user.role
        }, res);

    }


}
