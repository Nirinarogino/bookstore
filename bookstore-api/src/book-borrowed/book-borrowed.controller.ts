import { Body, Controller, Post } from '@nestjs/common';
import { BookBorrowedService } from './book-borrowed.service';

@Controller('book-borrowed')
export class BookBorrowedController {
    constructor(
        private bookBorrowedService: BookBorrowedService,
    ){}

    @Post()
    async borrowedBook(
                        @Body() borrowedBook: any,
                     ) {
        console.log(borrowedBook);
        return await this.bookBorrowedService.borrowedBook(borrowedBook.UserId, borrowedBook.BookId);
    }
}
