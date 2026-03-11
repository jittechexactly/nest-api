import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { UserDto } from '../dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../repository/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { UserServiceInterface } from '../interfaces/user-service.interface';
import { AuthResponse } from 'src/modules/auth/interfaces/auth-response.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService implements UserServiceInterface {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }


    async createUser(registerDto: RegisterDto): Promise<UserDto> {
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email },
        });

        if (existingUser) {
            throw new ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const user = this.userRepository.create({
            name: registerDto.name,
            email: registerDto.email,
            password: hashedPassword,
            isEmailVerified: false,
            isActive: true,
        });

        return this.userRepository.save(user);
    }

    async loginUser(loginDto: LoginDto): Promise<AuthResponse> {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
        });

        if (!user) {
            throw new NotFoundException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return this.accessTokenGenerate(user);
    }

    private async accessTokenGenerate(user: User): Promise<AuthResponse> {
        const payload = {
            sub: user.id,
            email: user.email,
        };

        const access_token = await this.jwtService.signAsync(payload);

        return {
            message: "Logged in successfully!",
            accessToken: access_token,
            refreshToken: access_token,
            tokenType: 'Bearer',
            expiresIn: 15
        };
    }

}
