import { Module } from '@nestjs/common';
import { BookBorrowedService } from './book-borrowed.service';
import { BookBorrowedController } from './book-borrowed.controller';

@Module({
  providers: [BookBorrowedService],
  controllers: [BookBorrowedController]
})
export class BookBorrowedModule {}
