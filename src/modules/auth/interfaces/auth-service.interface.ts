
import { ResponseDto } from 'src/modules/response/dto/response.dto';
import { EmailVerificationDto } from '../dto/emailverification.dto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { RegisterResponse } from './register-response.interface';
import { Response } from 'express';

export interface IAuthService {
    register(registerDto: RegisterDto): Promise<RegisterResponse>;
    login(loginDto: LoginDto, res: Response): Promise<ResponseDto>;
    emailVerification(emailverificationDto: EmailVerificationDto, res: Response): Promise<RegisterResponse>;
}