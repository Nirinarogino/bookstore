import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { addBookDto } from './dto/addBook.dto';
import { BookService } from './book.service';
import { UserReq } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('book')
export class BookController {
    constructor (
        private bookService: BookService
        ) {}

    @Post('add')
    @UseGuards(JwtAuthGuard)
    async addBook(
        @Body() book: addBookDto,
        @UserReq() user: any,
    ){          
        return await this.bookService.addBook(book);
    }
}
