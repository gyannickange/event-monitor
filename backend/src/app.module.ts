import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { QueueModule } from './queue/queue.module';
import { CategoriesModule } from './categories/categories.module';
import configuration from './common/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('db.host'),
        port: config.get<number>('db.port'),
        username: config.get<string>('db.user'),
        password: config.get<string>('db.pass'),
        database: config.get<string>('db.name'),
        autoLoadEntities: true,
        synchronize: config.get('env') !== 'production',
      }),
    }),
    QueueModule,
    ArticlesModule,
    CategoriesModule,
  ],
})
export class AppModule {}
