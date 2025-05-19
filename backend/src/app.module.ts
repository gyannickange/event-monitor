import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { QueueModule } from './queue/queue.module';
import {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
  IS_PROD
} from './common/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      autoLoadEntities: true,
      synchronize: !IS_PROD, // Disable synchronize in production
    }),
    QueueModule,
    NewsModule,
  ],
})
export class AppModule {}
