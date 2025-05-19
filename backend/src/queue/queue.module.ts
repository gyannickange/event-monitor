import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { REDIS_HOST, REDIS_PORT } from '../common/constants';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: REDIS_HOST,
        port: REDIS_PORT,
      },
    }),
    BullModule.registerQueue({ name: 'articles-daily-job' }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
