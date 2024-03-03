import { Module } from '@nestjs/common';
import { BookBorrowedService } from './book-borrowed.service';
import { BookBorrowedController } from './book-borrowed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books, BorrowedBook, User } from 'src/entities';

@Module({
  imports: [

    TypeOrmModule.forFeature([BorrowedBook, Books, User ])
  ],
  providers: [BookBorrowedService],
  controllers: [BookBorrowedController]
})
export class BookBorrowedModule {}
