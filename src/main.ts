import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { generateDocument } from '@/common/swagger/swagger';
import { AllExceptionFilter } from '@/common/filter/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const winstonProvider = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(winstonProvider);
  app.useGlobalFilters(new AllExceptionFilter(winstonProvider));
  if (configService.get('NODE_ENV') !== 'prod') {
    generateDocument(app);
  }

  await app.listen(configService.get<number>('general.port'));
}
bootstrap();
