import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { UserDto } from '../dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../repository/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { UserServiceInterface } from '../interfaces/user-service.interface';

@Injectable()
export class UsersService implements UserServiceInterface {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
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

    async loginUser(loginDto: LoginDto): Promise<any> {
        const IsexistUser = await this.userRepository.findOne({
            where: { email: loginDto.email },
        });

        if (!IsexistUser) {
            throw new NotFoundException('Invalid email or password');
        }
    }

}
