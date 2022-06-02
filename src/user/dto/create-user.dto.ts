import {IsEmail,IsNumber,IsString,IsNotEmpty, IsOptional} from "class-validator"
export class CreateUserDto {
    @IsNumber()
    @IsOptional()
    id: number;
    
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    password:string;
}