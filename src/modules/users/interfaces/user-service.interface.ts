import { RegisterDto } from "src/modules/auth/dto/register.dto";
import { UserDto } from "../dto/user.dto";
import { LoginDto } from "src/modules/auth/dto/login.dto";
import { AuthResponse } from "src/modules/auth/interfaces/auth-response.interface";

export interface UserServiceInterface {
    createUser(registerDto: RegisterDto): Promise<UserDto>;
    loginUser(loginDto: LoginDto): Promise<AuthResponse>
}