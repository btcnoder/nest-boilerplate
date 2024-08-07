import { Controller, Get, Inject, LoggerService } from '@nestjs/common';
import { ComfyuiService } from './comfyui.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { map } from 'rxjs/operators';

@Controller('comfyui')
export class ComfyuiController {
  constructor(
    private readonly comfyuiService: ComfyuiService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get()
  getInfo() {
    return this.comfyuiService.getInfo().pipe(map((res) => res.data));
  }

  @Get('img')
  uploadImgToComfyui() {
    const imgPath =
      '/Users/justnode/codeRepos/nodejs/nest-boilerplate/src/uploads/r1.png';
    return this.comfyuiService
      .uploadImage(imgPath)
      .pipe(map((res) => res.data));
  }

  @Get('queue')
  async queuePrompt() {
    return (await this.comfyuiService.queuePrompt()).pipe(
      map((res) => res.data),
    );
  }
  @Get('sendmsg')
  async sendMesssageTest() {
    await this.comfyuiService.MQPrompt();
    return 'message send ';
  }
}
