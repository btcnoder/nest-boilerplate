import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LogModule } from './common/log/log.module';
import { DBModule } from './modules/db/db.module';
import { UserModule } from './modules/user/user.module';
import GeneralConfig from './config/general';
import DatabaseConfig from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      load: [GeneralConfig, DatabaseConfig],
    }),
    LogModule,
    DBModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
