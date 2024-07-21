import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DBService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private configService: ConfigService) {
    const username = configService.get('database.username');
    const pwd = configService.get('database.password');
    const host = configService.get('database.host');
    const port = configService.get('database.port');
    const db = configService.get('database.database');
    const urlStr = `mysql://${username}:${pwd}@${host}:${port}/${db}`;
    super({
      datasources: {
        db: {
          url: urlStr,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
