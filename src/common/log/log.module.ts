import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const consoleTransport = new transports.Console({
          level: configService.get('general.log_level'),
          format: format.combine(
            format.timestamp(),
            utilities.format.nestLike(),
          ),
        });

        const dailyWarnTransport = new transports.DailyRotateFile({
          level: configService.get('general.log_level'),
          dirname: 'logs',
          filename: 'nestjs-error-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '7d',
        });
        return {
          transports: [
            consoleTransport,
            ...(configService.get('general.log_on')
              ? [dailyWarnTransport]
              : []),
          ],
        } as WinstonModuleOptions;
      },
      inject: [ConfigService],
    }),
  ],
})
export class LogModule {}
