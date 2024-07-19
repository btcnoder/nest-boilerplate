import { Injectable } from '@nestjs/common';
import { ApiException } from '@/common/filter/api.exception';
import { ApiCode } from '@/common/enums/api-code';

@Injectable()
export class AppService {
  getHello(): string {
    throw new ApiException('分类已存在', ApiCode.CATEGORY_EXIST);
  }
}
