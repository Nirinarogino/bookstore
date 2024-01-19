import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

    async addBook(book: addBookDto,user:any,file: any): Promise<Books> {
     const data = await this.userRepository.findOneByOrFail({ userName: user.userName });     

        if( data.role === 'admin') {
            const newBook =  this.bookRepository.create({...book, coverPath: file.path});
            console.log(file.path);
            
    
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

    async delleteBookById(id: number,user: any) {
        if( user.role !== 'admin') {
           throw new UnauthorizedException('You are not allowed to delete')
        }         
        const bookToDelete = await this.bookRepository.findOne({where: {bookId: id}})
        if(bookToDelete) {
          return  await this.bookRepository.softRemove(bookToDelete);
        }      
    }

    async restoreBook(id: number, user: any) {
        if(user.role === 'admin') {
            const backBook = await this.bookRepository.restore(id)
            return backBook
        }
        throw new UnauthorizedException('You are not allowed to restore')
    }
}