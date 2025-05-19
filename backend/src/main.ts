import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Starting application...');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('DB_HOST:', process.env.DB_HOST);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
