import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class MqSubService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @RabbitSubscribe({
    // 交换机
    exchange: `exchanges_test`,
    routingKey: ['routingKey_test'],
    // 队列
    queue: `queue_test`,
    // 持久化配置
    queueOptions: { durable: true },
  })

  // 收到队列的订阅消息自动调用该方法
  async subscribe(data: any): Promise<any> {
    const routingKey = arguments[1].fields.routingKey;
    console.log('arguments[1].fields.exchange :', arguments[1].fields.exchange);
    console.log('routingKey :', routingKey);
    console.log('data:', data);
    console.log(arguments);
    this.logger.log(
      `amqp receive msg,exchange is ${arguments[1].fields.exchange},routingKey is ${routingKey},msg is ${JSON.stringify(
        data,
      )}`,
    );
  }
}
