import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { QueueModule } from './queue/queue.module';
import { CategoriesModule } from './categories/categories.module';
import {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
  IS_PROD
} from './common/constants';
import configuration from './common/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
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
    ArticlesModule,
    CategoriesModule,
  ],
})
export class AppModule {}
