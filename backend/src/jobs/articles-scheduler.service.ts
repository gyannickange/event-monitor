import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class ArticlesSchedulerService implements OnModuleInit {
  constructor(
    @InjectQueue('articles-daily-job') private readonly queue: Queue
  ) {}

  async onModuleInit() {
    await this.queue.add(
      'fetch-yesterday-articles',
      {},
      {
        repeat: { pattern: '0 0 * * *' }, // Tous les jours à 0h
        removeOnComplete: true,
        removeOnFail: true,
        jobId: `fetch-yesterday-articles-${new Date().getTime()}`,
      }
    );

    // Add a job to run immediately on startup
    await this.queue.add(
      'fetch-yesterday-articles',
      {},
      {
        removeOnComplete: true,
        removeOnFail: true,
        jobId: `fetch-yesterday-articles-initial-${new Date().getTime()}`,
      }
    );
  }
}
