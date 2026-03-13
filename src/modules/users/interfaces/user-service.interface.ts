import { RegisterDto } from "src/modules/auth/dto/register.dto";
import { UserDto } from "../dto/user.dto";
import { LoginDto } from "src/modules/auth/dto/login.dto";
import { ResponseDto } from "src/modules/response/dto/response.dto";
import { EmailVerificationDto } from "src/modules/auth/dto/emailverification.dto";

export interface UserServiceInterface {
    createUser(registerDto: RegisterDto): Promise<any>;
    loginUser(loginDto: LoginDto): Promise<ResponseDto>;
    accessTokenGenerate(userDto: any): Promise<ResponseDto>;
    emailVerification(emailverificationDto: EmailVerificationDto): Promise<boolean>;
    updateUser(target: any, data: Record<string, any>): Promise<void>;
}