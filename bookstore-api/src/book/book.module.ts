import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books, User } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Books,User])
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
