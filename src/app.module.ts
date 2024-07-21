import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogModule } from './common/log/log.module';
import { DBModule } from './modules/db/db.module';
import { UserModule } from './modules/user/user.module';
import GeneralConfig from './config/general';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      load: [GeneralConfig],
    }),
    LogModule,
    DBModule,
    UserModule,
  ],
})
export class AppModule {}
