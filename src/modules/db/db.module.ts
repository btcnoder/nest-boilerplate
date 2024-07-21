import { Global, Module } from '@nestjs/common';
import { DBService } from './db.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
