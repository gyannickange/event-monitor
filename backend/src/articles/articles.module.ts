import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from './entities/articles.entity';
import { ArticlesService } from './articles.service';
import { ArticlesProcessor } from './articles.processor';
import { ArticlesSchedulerService } from '../jobs/articles-scheduler.service';
import { ArticlesAIService } from './ai/articles.service';
import { ArticlesController } from './articles.controller';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Articles]),
    QueueModule,
  ],
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    ArticlesProcessor,
    ArticlesSchedulerService,
    ArticlesAIService
  ],
})
export class ArticlesModule {}