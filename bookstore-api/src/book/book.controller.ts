import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { addBookDto } from './dto/addBook.dto';
import { Books, User } from 'src/entities';
import { BookService } from './book.service';
import { UserReq } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('book')
export class BookController {
    constructor (
        private bookService: BookService
        ) {}

    @Post('add')
    @UseGuards(JwtAuthGuard)
    async addBook(
        @Body() book: addBookDto,
        @UserReq() user: User,
        @Req() req: Request
    ): Promise<Books>{  
        console.log(req);  
        return await this.bookService.addBook(book, user);
    }
}
