import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ApiException } from './api.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code: number = status;
    let message: string | Array<string> = exception.message || exception.name;

    if (exception instanceof ApiException) {
      status = exception.getStatus();
      code = exception.getApiCode();
      message = exception.getApiMessage();
    } else if (exception instanceof BadRequestException) {
      status = exception.getStatus();
      code = status;
      message = exception['response']['message'];
    }

    response.status(status).json({
      code,
      message,
      timestamp: new Date().toISOString(),
    });

    this.logger.error(exception.message, exception.stack);
  }
}
