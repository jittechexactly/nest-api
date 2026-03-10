import { Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth-service.interface';
import { RegisterDto } from '../dto/register.dto';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { UsersService } from 'src/modules/users/service/users.service';
import { LoginDto } from '../dto/login.dto';
import { AuthResponse } from '../interfaces/auth-response.interface';

@Injectable()
export class AuthService implements IAuthService {
    constructor(private userService: UsersService) { }

    async register(registerDto: RegisterDto): Promise<RegisterResponse> {
        const user = await this.userService.createUser(registerDto);

        return {
            message: 'Registration successful',
            data: {
                name: user.name,
                email: user.email,
            },
        };
    }

    async login(loginDto: LoginDto): Promise<AuthResponse> {
        const data = await this.userService.loginUser(loginDto);

        return {
            message: "Login Successful!",
            accessToken: data.token,
            refreshToken: data.refreshToken,
            expiresIn: data.validity,
            tokenType: "Bearer"
        };
    }
}
