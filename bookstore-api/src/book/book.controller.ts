import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { addBookDto } from './dto/addBook.dto';
import { BookService } from './book.service';
import { UserReq } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import path from 'path';


@Controller('book')
export class BookController {
    constructor (
        private bookService: BookService
        ) {}


// =================== add book to the bookstore ===============
    @Post('add')
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
            destination: './book_images',
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                // const extension = path.parse(file.originalname).ext
                cb(null, file.fieldname + '-' + uniqueSuffix)
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
        if(!file){
            console.log('fichier introuvable');  
        }
        return await this.bookService.addBook(book,user,file);

    }
// =================== to view all book at the bookstore ===============

    @Get('view')
    @UseGuards(JwtAuthGuard)
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