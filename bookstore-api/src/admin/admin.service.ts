import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books, BorrowedBook, User } from 'src/entities';
import { demande } from 'src/enums/borrowed-demande.enums';
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
                const qb = this.borrowedBookRepository.createQueryBuilder("BorrowedBook");
                const demande = 'loading'
                const borrowedBooks = await qb
                .leftJoinAndSelect("BorrowedBook.book", "book")
                .leftJoinAndSelect("BorrowedBook.user", "user")
                .where("BorrowedBook.demande = :demande", { demande})
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

      async DemandeAccepeted(title: any, userNow: any) {
       const book = await this.bookRepository.findOne({where: {title: title.title}})
       console.log(book);
       const dm = demande.loading
       console.log(dm);
       
       const id = book.bookId
       const qb = this.borrowedBookRepository.createQueryBuilder("BorrowedBook");
                const borrowedBooks = await qb
                    .leftJoinAndSelect("BorrowedBook.book", "book")
                    .where('book.bookId = :id && BorrowedBook.demande = :dm'  , { id , dm })
                    .getMany();
                const borrowedBookInfo = borrowedBooks.map(borrowedBook => {
                    borrowedBook.demande = demande.accepted
                    this.borrowedBookRepository.save(borrowedBook);
                    return borrowedBook
                })
                return borrowedBookInfo;
    }
    
}
