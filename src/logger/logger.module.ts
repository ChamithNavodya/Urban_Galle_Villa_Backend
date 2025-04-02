import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
   imports: [ConfigModule],
   providers: [CustomLoggerService],
   exports: [CustomLoggerService],
})
export class LoggerModule {}
