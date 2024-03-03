import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books, BorrowedBook, User } from 'src/entities';
import { Repository } from 'typeorm';
import { borrowedDateDto } from './dto/borrowedBookDate.dto';

@Injectable()
export class BookBorrowedService {
    constructor(
        @InjectRepository(Books)
        private bookRepository: Repository<Books>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(BorrowedBook)
        private borrowedBookRepository: Repository<BorrowedBook>
    ){}

    async borrowedBook(user_id: number, book_id: number, bookDate: borrowedDateDto ) {
        const userWhoBorrowed = await this.userRepository.findOne({ where: { userId: user_id } });
        const bookWhichBorrowed = await this.bookRepository.findOne({ where:{ bookId: book_id } });
        const borrowedBook = this.borrowedBookRepository.create(bookDate);
        borrowedBook.book = bookWhichBorrowed;
        borrowedBook.user = userWhoBorrowed;
        borrowedBook.borrowedDate = bookDate.borrowedDate;
        borrowedBook.giveBakcDate = bookDate.giveBakcDate;
        return await this.borrowedBookRepository.save(borrowedBook);
    }
}