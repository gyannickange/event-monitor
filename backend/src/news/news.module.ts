import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { NewsService } from './news.service';
import { NewsProcessor } from './news.processor';
import { NewsSchedulerService } from '../jobs/news-scheduler.service';
import { NewsAIService } from './ai/news.service';
import { NewsController } from './news.controller';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([News]),
    QueueModule,
  ],
  controllers: [NewsController],
  providers: [
    NewsService,
    NewsProcessor,
    NewsSchedulerService,
    NewsAIService
  ],
})
export class NewsModule {}