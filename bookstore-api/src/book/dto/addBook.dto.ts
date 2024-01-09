import { IsDate, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class addBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsOptional()
    publisher: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    category: string;

    @IsString()
    @IsNotEmpty()
    language: string;

    @IsString()
    @IsNotEmpty()
    coverPath: string;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    publicationDAte: Date;
}