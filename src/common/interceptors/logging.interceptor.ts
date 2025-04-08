/* eslint-disable @typescript-eslint/no-unused-vars */
import {
   Injectable,
   NestInterceptor,
   ExecutionContext,
   CallHandler,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, tap } from 'rxjs';
import { CustomLoggerService } from 'src/logger/custom-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
   private readonly logger: CustomLoggerService;
   constructor(private readonly configService: ConfigService) {
      this.logger = new CustomLoggerService(configService);
      this.logger.setContext(LoggingInterceptor.name);
   }

   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { method, originalUrl, body, query, params } = request;
      const user = request['user']?.id || 'Guest';
      const now = Date.now();

      return next.handle().pipe(
         tap((data) => {
            const duration = Date.now() - now;
            this.logger.log(
               `[API] ${method} ${originalUrl} | ${duration}ms | User: ${user}`,
            );
         }),
      );
   }
}
