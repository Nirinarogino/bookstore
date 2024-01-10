import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { addBookDto } from './dto/addBook.dto';
import { BookService } from './book.service';
import { UserReq } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('book')
export class BookController {
    constructor (
        private bookService: BookService
        ) {}
// =================== add book to the bookstore ===============
    @Post('add')
    @UseGuards(JwtAuthGuard)
    async addBook(
        @Body() book: addBookDto,
        @UserReq() user: any,
    ){  
        return await this.bookService.addBook(book,user);
    }
// =================== to view all book at the bookstore ===============

    @Get('view')
    @UseGuards(JwtAuthGuard)
    async viewBook(){
        return await this.bookService.viewAllBooks()
    }

// =================== dteele a book to the bookstore ===============

    @Delete('deleteBook/:id')
    @UseGuards(JwtAuthGuard)
    async deleteBookById (
        @Param('id') id: number,
        @UserReq() user: any,
    ){
        return await this.bookService.delleteBookById(id,user)
    }

    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async restoreBook(
        @Param('id') id: number,
        @UserReq() user: any,
    ){                      
        return await this.bookService.restoreBook(id,user)
    }

}