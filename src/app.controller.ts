import { Controller, Get, Inject, LoggerService } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DBService } from './modules/db/db.service';

@ApiTags('app模块')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly dbService: DBService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'get请求根路由' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('product')
  getProduct() {
    return this.dbService.product.findMany({
      where: {
        published: true,
      },
    });
  }
}
