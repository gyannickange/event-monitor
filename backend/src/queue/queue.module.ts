import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('redis.host'),
          port: parseInt(config.get<string>('redis.port', '6379'), 10),
        },
      }),
    }),
    BullModule.registerQueue({ name: 'articles-daily-job' }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
