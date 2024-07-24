import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { error } from 'console';
import { response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class MqSubService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  // 收到队列的订阅消息自动调用该方法
  @RabbitSubscribe({
    // 交换机
    exchange: `exchanges_test`,
    routingKey: ['routingKey_test'],
    queue: `queue_test`,
    // 持久化配置
    queueOptions: { durable: true },
  })
  async subscribe(msg: string, amqpMsg): Promise<any> {
    const url = 'http://127.0.0.1:8188/prompt';
    const exchange = amqpMsg.fields.exchange;
    const routingKey = amqpMsg.fields.routingKey;
    console.log('exchange :', exchange);
    console.log('routingKey :', routingKey);
    console.log(url, msg);

    this.httpService.post(url, msg).subscribe({
      next: (response) => {
        console.log('Response from third-party API:', response.data);
      },
      error: (error) => {
        console.error('Error sending message to third-party API:', error);
      },
    });

    // try {
    //   const response = await lastValueFrom(this.httpService.post(url, msg));
    //   console.log('Response from third-party API:', response.data);
    // } catch (error) {
    //   console.error('Error sending message to third-party API:', error);
    // }

    // this.logger.log(
    //   `amqp receive msg,exchange is ${exchange},routingKey is ${routingKey},msg is ${JSON.stringify(
    //     msg,
    //   )}`,
    // );
  }
}
