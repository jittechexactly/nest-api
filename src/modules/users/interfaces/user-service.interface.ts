import { RegisterDto } from "src/modules/auth/dto/register.dto";
import { LoginDto } from "src/modules/auth/dto/login.dto";
import { ResponseDto } from "src/modules/response/dto/response.dto";
import { EmailVerificationDto } from "src/modules/auth/dto/emailverification.dto";
import { Response } from "express";

export interface UserServiceInterface {
    createUser(registerDto: RegisterDto): Promise<any>;
    loginUser(loginDto: LoginDto, res: Response): Promise<ResponseDto>;
    accessTokenGenerate(userDto: any, res: Response): Promise<ResponseDto>;
    emailVerification(emailverificationDto: EmailVerificationDto): Promise<boolean>;
    updateUser(target: any, data: Record<string, any>): Promise<void>;
}