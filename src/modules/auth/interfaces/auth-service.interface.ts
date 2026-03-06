
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthResponse } from './auth-response.interface';
import { JwtPayload } from './jwt-payload.interface';
import { RegisterResponse } from './register-response.interface';

export interface IAuthService {
    validateUser(email: string, password: string): Promise<any>;
    register(registerDto: RegisterDto): Promise<RegisterResponse>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
    generateTokens(payload: JwtPayload): Promise<AuthResponse>;
    refreshToken(userId: string, refreshToken: string): Promise<AuthResponse>;
}