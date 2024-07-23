import { Module } from '@nestjs/common';
import { MqSubService } from './mq-sub.service';

@Module({
  providers: [MqSubService],
})
export class MqSubModule {}
