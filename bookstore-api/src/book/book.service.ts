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

    async addBook(book: addBookDto,user:any): Promise<Books>{  
        const newUser = await this.userRepository.findOneBy({userName: user.name})           
        if(newUser.role === 'admin'){
            const newBook =  this.bookRepository.create(book);
            try {
                await this.bookRepository.save(newBook);
            } catch (err) {
                throw new ConflictException(err);
            }
            delete newBook.addDate;
            delete newBook.deleteDate;
            return newBook;
        } else{
            console.log(user); 
            throw new UnauthorizedException();
        }

    }
       
}
