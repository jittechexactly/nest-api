
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthResponse } from './auth-response.interface';
import { RegisterResponse } from './register-response.interface';

export interface IAuthService {
    register(registerDto: RegisterDto): Promise<RegisterResponse>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
}