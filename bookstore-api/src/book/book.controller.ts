import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { addBookDto } from './dto/addBook.dto';
import { BookService } from './book.service';
import { UserReq } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import { join } from 'path';


@Controller('book')
export class BookController {
    constructor (
        private bookService: BookService
        ) {}


// =================== add book to the bookstore ===============
    @Post('add')
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
            destination: 'book_images',
            filename: (req, file, cb) => {
                const name: string = file.originalname.split('.')[0];
                const tmp: Array<string> = file.originalname.split('.');
                const fileExtension: string = tmp[tmp.length - 1];
                const newFilename: string = name.split('.').join('_')+ '_'+ Date.now()+'.'+fileExtension;
                cb(null, newFilename);
              }
        })
    }))
    @UseGuards(JwtAuthGuard)
    async addBook(
        @Body() book: addBookDto,
        @UserReq() user: any,    
        @UploadedFile()file: Express.Multer.File,
    ){      
        // return await this.bookService.addBook(book,user,file);
        return await this.bookService.addBook(book,user,file);

    }
// =================== to view all book at the bookstore ===============

    @Get('all')
    // @UseGuards(JwtAuthGuard)
    async viewBook(){
        return await this.bookService.viewAllBooks()
    }

// =================== dteele a book to the bookstore ===============

    @Delete('deleteBook/:id')
    @UseGuards(JwtAuthGuard)
    async deleteBookById (
        @Param('id') id: number,
        @UserReq() user: any,
    ){
        return await this.bookService.delleteBookById(id,user)
    }

    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async restoreBook(
        @Param('id') id: number,
        @UserReq() user: any,
    ){                      
        return await this.bookService.restoreBook(id,user)
    }

}