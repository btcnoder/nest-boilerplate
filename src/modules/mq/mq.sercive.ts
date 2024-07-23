import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Inject,
  Injectable,
  LoggerService,
  OnModuleInit,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class MqService implements OnModuleInit {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly amqp: AmqpConnection,
  ) {}

  /**
   * onModuleInit 是 NestJS 中一个生命周期钩子方法，
   * 它是 @nestjs/common 模块提供的 OnModuleInit 接口的一部分。
   * 实现了该接口并实现了 onModuleInit 方法的类，在模块加载时会自动执行该方法
   */
  async onModuleInit() {
    // 启动监听
    this.monitorConn();
  }

  /**
   * rabbitmq连接监听
   */
  monitorConn() {
    const conn = this.amqp.managedConnection;
    if (conn) {
      conn.on('connect', () => {
        this.logger.log('rabbitmq broker connect');
      });
      conn.on('disconnect', () => {
        this.logger.error('rabbitmq broker disconnect');
      });
    }
    const chan = this.amqp.managedChannel;
    if (chan) {
      chan.on('connect', () => {
        this.logger.log('rabbitmq channel connect');
      });
      chan.on('error', () => {
        this.logger.error('rabbitmq channel error');
      });
      chan.on('close', () => {
        this.logger.error('rabbitmq channel close');
      });
    }
  }

  // exchange
  private readonly exc_test = `exchanges_test`;
  // routingKey
  private readonly routingKey_test = 'routingKey_test';

  /**
   * rabbitmq发送消息
   * @param message
   */
  async pubMQMsgTest(message: any): Promise<void> {
    await this.amqp.publish(this.exc_test, this.routingKey_test, message);
    this.logger.log(
      `amqp publish message -> exchange : ${this.exc_test}, routingKey : ${this.routingKey_test},message : ${JSON.stringify(
        message,
      )}`,
    );
  }
}
