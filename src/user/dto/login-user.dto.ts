import {IsEmail,IsNumber,IsString,IsNotEmpty, IsOptional} from "class-validator"
export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    password:string;
}