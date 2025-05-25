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
        repeat: { pattern: '0 0 * * *' }, // Every day at midnight
        removeOnComplete: true,
        removeOnFail: true,
        jobId: `fetch-yesterday-articles-${new Date().getTime()}`,
      }
    );
  }
}
