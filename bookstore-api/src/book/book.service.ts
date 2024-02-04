import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { addBookDto } from './dto/addBook.dto';
import { Books, User } from 'src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Books)
        private bookRepository: Repository<Books>,
        @InjectRepository(User)
        private userRepository: Repository<User>
        ) {}

    async addBook(book: addBookDto, user: any, file: any): Promise<Books> {
        const data = await this.userRepository.findOneByOrFail({ userName: user.userName });
        // @ts-ignore
        const jsonData = JSON.parse(book.jsonData);
        const newBook =  this.bookRepository.create(book);        
                newBook.title = book.title ,                
                console.log('titre de la book',book.title);
                newBook.title =jsonData.title
                newBook.author=jsonData.author
                newBook.PublicationDAte =jsonData.publicationDAte,
                newBook.publisher=jsonData.publisher,
                newBook.description=jsonData.description ,
                newBook.category=jsonData.category,
                newBook.language=jsonData.language ,
                newBook.coverPath=`http://localhost:3000/book_images/${file.filename}`;

        
        if( data.role === 'admin') {
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
    async findBookById( id: number ) : Promise<Books>{
        const bookFind = await this.bookRepository.findOne({where: {bookId: id}})
        if(bookFind){
            console.log('trouver')
            return  bookFind;
        } 
        throw new UnauthorizedException('You are not allowed to')
    }
}