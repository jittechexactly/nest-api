
import { LoginDto } from '../dto/login.dto';
import { AuthResponse } from './auth-response.interface';
import { JwtPayload } from './jwt-payload.interface';

export interface IAuthService {
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
    generateTokens(payload: JwtPayload): Promise<AuthResponse>;
    refreshToken(userId: string, refreshToken: string): Promise<AuthResponse>;
}