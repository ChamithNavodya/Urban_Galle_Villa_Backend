import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from './logger/custom-logger.service';

async function bootstrap() {
   const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
   });
   const configService = app.get(ConfigService);
   const port = configService.get<number>('port');

   // Config logger
   const logger = await app.resolve(CustomLoggerService);
   // Set application context
   logger.setContext('NestApplication');
   app.useLogger(logger);

   app.setGlobalPrefix('api/v1');

   await app.listen(port);
   logger.log(`Application is running on: ${port}`);
}
bootstrap();
