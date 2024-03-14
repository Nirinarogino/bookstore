import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { Books, BorrowedBook, User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Books)
        private bookRepository: Repository<Books>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(BorrowedBook)
        private borrowedBookRepository: Repository<BorrowedBook>
    ){}
    async getByAdminAllBorrowed(userNow: any) {
        if(userNow.role === 'admin')
            {
               const name = userNow.userName
                const qb = this.borrowedBookRepository.createQueryBuilder("BorrowedBook");
                const borrowedBooks = await qb
                .leftJoinAndSelect("BorrowedBook.book", "book")
                .leftJoinAndSelect("BorrowedBook.user", "user")
                .getMany();
                const borrowedBookInfo = borrowedBooks.map(borrowedBook => {
                    delete borrowedBook.user.password
                    delete borrowedBook.user.salt
                    delete borrowedBook.user.firstName
                    delete borrowedBook.user.lastName
                    return borrowedBook;
                });// pour recuperer seulement le book

                return borrowedBookInfo; 

            }
    }
    async getAllUser(userNow: any){
        if(userNow.role === 'admin'){
            const allUser = await this.userRepository.find();
            return  allUser.map(user =>{
                delete user.password
                delete user.salt
                return user
            })
        }
      }

}
