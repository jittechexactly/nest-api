import { IsEmail, IsNotEmpty, IsNumber, MaxLength } from "class-validator";

export class EmailVerificationDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MaxLength(6)
    otp: number
}