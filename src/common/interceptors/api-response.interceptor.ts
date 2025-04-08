import {
   CallHandler,
   ExecutionContext,
   Injectable,
   NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
   success: boolean;
   message: string;
   data: T;
   error?: any;
}

@Injectable()
export class ApiResponseInterceptor<T>
   implements NestInterceptor<T, ApiResponse<T>>
{
   intercept(
      context: ExecutionContext,
      next: CallHandler,
   ): Observable<ApiResponse<T>> {
      const request = context.switchToHttp().getRequest();
      const message = this.getDefaultMessage(request.method);

      return next.handle().pipe(
         map((data) => ({
            success: data?.success || true,
            message: data?.message || message,
            data: data?.data || data || null,
         })),
      );
   }

   private getDefaultMessage(method: string): string {
      switch (method) {
         case 'GET':
            return 'Request successful';
         case 'POST':
            return 'Resource created successfully';
         case 'PUT':
         case 'PATCH':
            return 'Resource updated successfully';
         case 'DELETE':
            return 'Resource deleted successfully';
         default:
            return 'Operation successful';
      }
   }
}
