import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'
import * as express from 'express';
import * as helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'))
  app.use('/book_images', express.static('book_images'));
  const corsOption = {
    origin: ['http://localhost:4200']
  }
  app.enableCors(corsOption)
  await app.listen(3000);

}
bootstrap();
