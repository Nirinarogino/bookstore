import { Body, Controller, Post } from '@nestjs/common';
import { borrowedDateDto } from './dto/borrowedBookDate.dto';
import { UserReq } from 'src/decorators/user.decorator';
import { BookBorrowedService } from './book-borrowed.service';
import { User } from 'src/entities';

@Controller('book-borrowed')
export class BookBorrowedController {
    constructor(
        private bookBorrowedService: BookBorrowedService,
    ){}

    @Post()
    async borrowedBook(@Body() user: User,book_id: number,bookDate: borrowedDateDto ) {
        console.log(user);
        return await this.bookBorrowedService.borrowedBook(user, book_id, bookDate)
    }
}
