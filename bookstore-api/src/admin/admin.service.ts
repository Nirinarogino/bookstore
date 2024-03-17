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
        // const teste = await this.bookRepository.find({where:{title: title.Title}})
        // console.log(teste);
        const titre = title.title
        try {
            if (userNow === undefined || userNow === null) {
                throw new UnauthorizedException('Vous devez être connecté');
            }
            const title = userNow.userName
            const qb = this.borrowedBookRepository.createQueryBuilder("BorrowedBook");
            const borrowedBooks = await qb
                .leftJoinAndSelect("BorrowedBook.book", "book")
                // .leftJoinAndSelect("BorrowedBook.user", "user")
                .where('book.title = :titre'  , { titre })
                .getMany();
                const bookInfo = borrowedBooks.map(borrowedBook => {
                    // delete borrowedBook.user
                    return borrowedBook;
                });// pour recuperer seulement le book
            return bookInfo; // Optionnel : retourne le tableau borrowedBooks
        } catch (error) {
            // Gère les erreurs potentielles
            console.error(error);
            throw error; // Renvoie l'erreur pour qu'elle soit gérée par l'appelant
        }
    }
    
        
    }
