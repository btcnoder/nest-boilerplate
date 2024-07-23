import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MqModule } from '@/modules/mq/mq.module';
import { ComfyuiController } from './comfyui.controller';
import { ComfyuiService } from './comfyui.service';

@Module({
  imports: [HttpModule, MqModule],
  controllers: [ComfyuiController],
  providers: [ComfyuiService],
})
export class ComfyuiModule {}
