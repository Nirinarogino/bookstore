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

        async getBookBorrowedByOneUser(userNow: any){
            if(!userNow){// verification si l'utilisateur est déjà connecté
                throw new UnauthorizedException('You must be logged in')
            }
             const book = await this.borrowedBookRepository.find({where:{user: userNow}}) // on cherche le borrowed book associer a cette user
             console.log(book);
            //  book.forEach( async (elt)=>{
            //      console.log(elt.borrowedId);
            //      const mybook = await this.bookRepository.findOne({where:{bookId: elt.book.bookId}})
            //      console.log(mybook);
            //  })
        }
    }