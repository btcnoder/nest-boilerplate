import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiCode } from '@/common/enums/api-code';

export class ApiException extends HttpException {
  constructor(
    private apiMessage: string,
    private apiCode: ApiCode,
    public statusCode: HttpStatus = HttpStatus.OK,
  ) {
    super(apiMessage, statusCode);
  }

  getApiMessage() {
    return this.apiMessage;
  }

  getApiCode() {
    return this.apiCode;
  }
}
