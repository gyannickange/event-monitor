import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { NewsService } from './news.service';
import { NewsProcessor } from './news.processor';
import { NewsSchedulerService } from '../jobs/news-scheduler.service';
import { NewsAIService } from './ai/news.service';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([News]),
    QueueModule,
  ],
  providers: [
    NewsService,
    NewsProcessor,
    NewsSchedulerService,
    NewsAIService
  ],
})
export class NewsModule {}