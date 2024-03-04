import { IsIn, IsNotEmpty, IsString, MaxLength, MinLength,IsEmail } from "class-validator"; 

export class SubscribeDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    userName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    lastName: string;

    @IsString()
    password: string;

    @IsIn(['admin','reader'])
    @IsString()
    role: string;
}
