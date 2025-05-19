import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NewsSchedulerService implements OnModuleInit {
  constructor(
    @InjectQueue('news-daily-job') private readonly queue: Queue
  ) {}

  async onModuleInit() {
    await this.queue.add(
      'fetch-yesterday-news',
      {},
      {
        repeat: { pattern: '0 0 * * *' }, // Tous les jours à 0h
        removeOnComplete: true,
        removeOnFail: true,
        jobId: `fetch-yesterday-news-${new Date().getTime()}`,
      }
    );
  }
}
