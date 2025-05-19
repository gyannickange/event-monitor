import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT!, 10),
      },
    }),
    BullModule.registerQueue({ name: 'news-daily-job' }),
  ],
})
export class QueueModule {}
