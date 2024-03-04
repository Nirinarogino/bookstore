import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { Books, BorrowedBook, User } from './entities';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { BookBorrowedModule } from './book-borrowed/book-borrowed.module';

dotenv.config()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type:'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Books,BorrowedBook],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    BookModule,
    BookBorrowedModule,

  ],
  controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    // IMPORTANT! Call Middleware.configure BEFORE using it for routes
    HelmetMiddleware.configure({})
    consumer.apply(HelmetMiddleware).forRoutes('');
}
}
