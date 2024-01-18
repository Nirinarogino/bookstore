import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { addBookDto } from './dto/addBook.dto';
import { BookService } from './book.service';
import { UserReq } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

@Controller('book')
export class BookController {
    constructor (
        private bookService: BookService
        ) {}
// ===================== declaration of the const =====================

storage = multer.diskStorage({
    destination: './book_images',
    filename: function (req, file, cb) {
        const filename: string = path.parse(file.originalname).name.replace(/\\/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;
        cb(null, filename + extension)
    }
})
 upload = multer({ storage: this.storage })


// =================== add book to the bookstore ===============
    @Post('add')
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(JwtAuthGuard)
    async addBook(
        @Body() book: addBookDto,
        @UserReq() user: any,
    ){  
        return await this.bookService.addBook(book,user);
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