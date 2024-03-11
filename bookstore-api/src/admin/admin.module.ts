import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books, BorrowedBook, User } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, BorrowedBook, Books])
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {
  
}
