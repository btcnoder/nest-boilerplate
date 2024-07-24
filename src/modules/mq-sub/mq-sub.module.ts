import { Module } from '@nestjs/common';
import { MqSubService } from './mq-sub.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MqSubService],
})
export class MqSubModule {}
