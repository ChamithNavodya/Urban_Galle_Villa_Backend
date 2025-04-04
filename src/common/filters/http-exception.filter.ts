import {
   ExceptionFilter,
   Catch,
   ArgumentsHost,
   HttpException,
   HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
   catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      const status =
         exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

      const message =
         exception instanceof Error
            ? exception.message
            : 'Internal server error';

      response.status(status).json({
         success: false,
         message,
         data: null,
         error: {
            statusCode: status,
            errors:
               exception instanceof HttpException &&
               exception.getResponse() instanceof Object
                  ? (exception.getResponse() as any)?.errors || null
                  : null,
            timestamp: new Date().toISOString(),
            path: request.url,
            stack:
               process.env.NODE_ENV !== 'production'
                  ? exception['stack']
                  : undefined,
         },
      });
   }
}
