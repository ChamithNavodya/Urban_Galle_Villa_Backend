import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from './logger/custom-logger.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
// import { SeederService } from './database/seeder/seeder.service';

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

   // Config cores
   app.enableCors({
      origin: ['http://localhost:3000'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true, // If you need to send cookies
      allowedHeaders: 'Content-Type, Accept, Authorization',
   });

   // Run seeder only in development/staging
   // const seeder = app.get(SeederService);
   // await seeder.seed();

   // Register global Validation Pipeline
   app.useGlobalPipes(
      new ValidationPipe({
         whitelist: true,
         forbidNonWhitelisted: true,
         exceptionFactory: (errors) => {
            const messages = errors.flatMap((error) =>
               Object.values(error.constraints || {}),
            );

            return new BadRequestException({
               message: 'Validation failed',
               errors: messages,
               error: 'Bad Request',
               statusCode: 400,
            });
         },
         transform: true,
      }),
   );

   // Register global interceptor
   app.useGlobalInterceptors(new ApiResponseInterceptor());
   app.useGlobalInterceptors(new LoggingInterceptor(configService));
   // Register global exception filter
   app.useGlobalFilters(new HttpExceptionFilter());

   await app.listen(port);
   logger.log(`Application is running on: ${port}`);
}
bootstrap();
