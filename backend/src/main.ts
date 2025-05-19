import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './common/constants';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  // Increase JSON body limit to 10MB
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  await app.listen(APP_PORT ?? 3001);
}
bootstrap();
