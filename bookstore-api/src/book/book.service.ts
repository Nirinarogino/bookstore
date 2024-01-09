import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { addBookDto } from './dto/addBook.dto';
import { Books, User } from 'src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Books)
        private bookRepository: Repository<Books>,
        @InjectRepository(User)
        private userRepository: Repository<User>
        ) {}

    async addBook(book: addBookDto,user:any): Promise<Books> {
     const data = await this.userRepository.findOneByOrFail({ userName: user.userName });

        if( user.role === 'admin') {
            const newBook =  this.bookRepository.create(book);
            try {

                newBook.availabilityStatus = 'available';
                await this.bookRepository.save(newBook);
            } catch ( err ) {
                throw new ConflictException( err );
            }
            delete newBook.addDate;
            delete newBook.deleteDate;
            return newBook;
        } else { 
            throw new UnauthorizedException('acces denied');
        }
    }
       
    async viewAllBooks(){
            return await this.bookRepository.find()
    }
}
