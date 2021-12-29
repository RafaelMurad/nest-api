import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
 const app = await NestFactory.create(AppModule);
 app.useGlobalPipes(new ValidationPipe());
 app.enableCors({
     origin: '*',
     methods: 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
     allowedHeaders: 'Content-Type, Authorization'
 });
 await app.listen(3000);
}
bootstrap();
