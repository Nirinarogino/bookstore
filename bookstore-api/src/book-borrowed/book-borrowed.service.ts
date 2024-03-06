    import { Injectable, UnauthorizedException } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Books, BorrowedBook, User } from 'src/entities';
    import { DeepPartial, Repository } from 'typeorm';

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

        async borrowedBook(user:any, book_id: number) {
            const userWhoBorrowed = await this.userRepository.findOne({where: {userId: user.userId}});
            const bookWhichBorrowed = await this.bookRepository.findOne({ where:{ bookId: book_id } });
            const newBorrowedBookPartial: DeepPartial<BorrowedBook> = {
                borrowedDate: new Date(Date.now()),
                giveBakcDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                user: userWhoBorrowed,
                book: bookWhichBorrowed
              };
              console.log(newBorrowedBookPartial);
            const newBorrowedBook =  this.borrowedBookRepository.create(newBorrowedBookPartial);
            return await this.borrowedBookRepository.save(newBorrowedBook);
        }

        async getBookBorrowedByOneUser(userNow: any) {
            try {
                if (userNow === undefined || userNow === null) {
                    throw new UnauthorizedException('Vous devez être connecté');
                }
                const name = userNow.userName
                const qb = this.borrowedBookRepository.createQueryBuilder("BorrowedBook");
                const borrowedBooks = await qb
                    .leftJoinAndSelect("BorrowedBook.book", "book")
                    .leftJoinAndSelect("BorrowedBook.user", "user")
                    .where('user.userName = :name', { name })
                    .getMany();
                    const bookInfo = borrowedBooks.map(borrowedBook => borrowedBook.book);// pour recuperer seulement le book
                return bookInfo; // Optionnel : retourne le tableau borrowedBooks
            } catch (error) {
                // Gère les erreurs potentielles
                console.error(error);
                throw error; // Renvoie l'erreur pour qu'elle soit gérée par l'appelant
            }
        }

        async getBookByCategory(bookCategory: any){
            console.log(bookCategory);
            const bookCathegory = await this.bookRepository.find({where:{category: bookCategory}})
            console.log(bookCathegory);
            return bookCathegory
        }
        
    }