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

    async borrowedBook(user: User, book_id: number, bookDate: borrowedDateDto ) {

        const userWhoBorrowed = await this.userRepository.findOne( {where:{userName: user.userName}});
        console.log(userWhoBorrowed);
        const bookWhichBorrowed = await this.bookRepository.findOne({ where:{ bookId: book_id } });
        console.log(bookWhichBorrowed);
        const borrowedBook = this.borrowedBookRepository.create();
        borrowedBook.book = bookWhichBorrowed;
        borrowedBook.user = userWhoBorrowed;
        borrowedBook.borrowedDate = bookDate.borrowedDate;
        borrowedBook.giveBakcDate = bookDate.giveBakcDate;
        return await this.borrowedBookRepository.save(borrowedBook);
    }
}