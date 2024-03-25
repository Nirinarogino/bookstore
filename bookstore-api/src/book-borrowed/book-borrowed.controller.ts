import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { BookBorrowedService } from './book-borrowed.service';
import { UserReq } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('book-borrowed')
export class BookBorrowedController {
    constructor(
        private bookBorrowedService: BookBorrowedService,
    ){}

    @Put()
    @UseGuards(JwtAuthGuard)
    async borrowedBook(
                        @Body() borrowedBook: any,
                        @UserReq() user: any,
                     ) {
        console.log(borrowedBook);
        return await this.bookBorrowedService.borrowedBook(user, borrowedBook.BookId);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    getBorrowedBook(@UserReq() user: any){
        return  this.bookBorrowedService.getBookBorrowedByOneUser(user);
    }
    @Post(':cat')
    getBookByCategory(
        @Body() bookByCategory: any,
    ){
        return  this.bookBorrowedService.getBookByCategory(bookByCategory.Category);
    }
}
