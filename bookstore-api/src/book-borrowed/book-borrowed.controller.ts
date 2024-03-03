import { Controller, Post } from '@nestjs/common';
import { borrowedDateDto } from './dto/borrowedBookDate.dto';
import { UserReq } from 'src/decorators/user.decorator';
import { BookBorrowedService } from './book-borrowed.service';

@Controller('book-borrowed')
export class BookBorrowedController {
    constructor(
        private bookBorrowedService: BookBorrowedService,
    ){}

    @Post()
    async borrowedBook(@UserReq() user: any,book_id: number,bookDate: borrowedDateDto ) {
        return await this.bookBorrowedService.borrowedBook(user.userId, book_id, bookDate)
    }
}
