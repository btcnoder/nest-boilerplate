import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import * as FormData from 'form-data';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import { MqService } from '@/modules/mq/mq.sercive';

@Injectable()
export class ComfyuiService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly mqService: MqService,
  ) {}

  getInfo(): Observable<AxiosResponse<any>> {
    return this.httpService.get('https://api.thecatapi.com/v1/images/search');
  }

  uploadImage(filePath: string): Observable<AxiosResponse<any>> {
    // 创建 FormData 对象
    const formData = new FormData();
    // 读取文件并将其附加到 FormData 对象
    const fileStream = fs.createReadStream(filePath);
    formData.append('image', fileStream);
    console.log(1111);
    // 发送 POST 请求到第三方接口
    const url = 'http://127.0.0.1:8188/upload/image';
    return this.httpService.post(url, formData, {
      headers: {
        ...formData.getHeaders(), // 设置必要的 headers
      },
    });
  }

  async queuePrompt() {
    const url = 'http://127.0.0.1:8188/prompt';
    const client_id = '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed';
    const filePath =
      '/Users/justnode/codeRepos/nodejs/nest-boilerplate/src/uploads/1.json';
    const prompt = await fsPromises.readFile(filePath, 'utf-8');
    const jsonObj = { prompt: JSON.parse(prompt), client_id: client_id };
    console.log(jsonObj);
    return this.httpService.post(url, jsonObj);
  }

  async MQPrompt() {
    const client_id = '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bdf';
    const filePath =
      '/Users/justnode/codeRepos/nodejs/nest-boilerplate/src/uploads/1.json';
    const prompt = await fsPromises.readFile(filePath, 'utf-8');
    const jsonObj = { prompt: JSON.parse(prompt), client_id: client_id };

    this.mqService.pubMQMsgTest(jsonObj);
  }
}
