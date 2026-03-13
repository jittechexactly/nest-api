import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class UserDto {
    
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    emailOtp: number;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    isEmailVerified: boolean;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}