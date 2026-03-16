import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../repository/user.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { UserServiceInterface } from '../interfaces/user-service.interface';
import { JwtService } from '@nestjs/jwt';
import { ResponseService } from 'src/modules/response/service/response.service';
import { ResponseDto } from 'src/modules/response/dto/response.dto';
import { EmailVerificationDto } from 'src/modules/auth/dto/emailverification.dto';
import { Response } from 'express';

@Injectable()
export class UsersService implements UserServiceInterface {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly responseService: ResponseService
    ) { }


    async createUser(registerDto: RegisterDto): Promise<any> {
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email },
        });

        if (existingUser) {
            throw new ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000);
        const verficationDuration = new Date(Date.now() + 15 * 60 * 1000);

        const user = this.userRepository.create({
            name: registerDto.name,
            email: registerDto.email,
            emailOtp: otp,
            password: hashedPassword,
            isEmailVerified: false,
            isActive: true,
            emailverificationDuration: verficationDuration
        });

        return this.userRepository.save(user);
    }

    async loginUser(loginDto: LoginDto, res: Response): Promise<ResponseDto> {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
        });

        if (!user) {
            throw new HttpException(
                this.responseService.response(false, "Invalid Email or Password!", {}),
                HttpStatus.UNAUTHORIZED
            );
        }

        if (!user.isEmailVerified || !user.isActive) {
            throw new HttpException(
                this.responseService.response(false, "User not active! Please contact to the admin.", {}),
                HttpStatus.FORBIDDEN
            );
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new HttpException(
                this.responseService.response(false, "Invalid Email or Password!", {}),
                HttpStatus.UNAUTHORIZED
            );
        }

        return this.accessTokenGenerate(user, res);
    }

    async accessTokenGenerate(userDto: any, res: Response): Promise<ResponseDto> {
        const payload = {
            sub: userDto.id,
            email: userDto.email,
        };

        await this.updateUser(userDto.id, {
            lastLoginAt: new Date()
        });

        const access_token = this.generateAccessToken(payload);
        const refresh_token = this.generateRefreshToken(payload);
        
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        throw new HttpException(
            this.responseService.response(true, "Logged in successfully!", {
                accessToken: access_token,
                tokenType: "Bearer",
                expiresIn: 15
            }),
            HttpStatus.OK
        );
    }

    async emailVerification(emailverificationDto: EmailVerificationDto): Promise<boolean> {
        const credentials = await this.userRepository.findOne({
            where: {
                email: emailverificationDto.email,
                emailOtp: emailverificationDto.otp,
                emailverificationDuration: MoreThanOrEqual(new Date()),
            },
        });

        if (!credentials) {
            return false;
        }

        await this.updateUser(credentials.id, {
            emailOtp: null,
            emailverificationDuration: null,
            isEmailVerified: true,
        });

        return true;
    }

    async updateUser(target: any, data: Record<string, any>): Promise<void> {
        await this.userRepository.update(target, data);
    }

    private generateAccessToken(payload: object): string {
        return this.jwtService.sign(payload, {
            expiresIn: '30m',
        });
    }

    private generateRefreshToken(payload: object): string {
        return this.jwtService.sign(payload, {
            expiresIn: '7d',
        });
    }
}
