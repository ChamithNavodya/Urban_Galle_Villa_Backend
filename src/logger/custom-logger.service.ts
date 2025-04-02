import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
   private logLevels: string[];
   private excludedContexts: string[];

   constructor(private readonly configService: ConfigService) {
      super();
      this.initializeLogLevels();
      this.initializeExcludedContexts();
   }

   private initializeLogLevels() {
      const levels = this.configService.get<string>(
         'logLevels',
         'log,error,warn,debug,verbose',
      );
      this.logLevels = levels
         .split(',')
         .map((level) => level.trim().toLowerCase());
   }

   private initializeExcludedContexts() {
      const contexts = this.configService.get<string>(
         'logExcludedContexts',
         'RouterExplorer,InstanceLoader',
      );
      this.excludedContexts = contexts.split(',').map((ctx) => ctx.trim());
   }

   private shouldLog(context?: string): boolean {
      return !context || !this.excludedContexts.includes(context);
   }

   log(message: string, context?: string) {
      if (message === undefined) return;
      if (this.logLevels.includes('log') && this.shouldLog(context)) {
         const logContext = context || this.context;
         super.log(message, logContext);
      }
   }

   error(message: string, trace?: string, context?: string) {
      if (message === undefined) return;
      if (this.logLevels.includes('error') && this.shouldLog(context)) {
         super.error(message, trace, context);
      }
   }

   warn(message: string, context?: string) {
      if (message === undefined) return;
      if (this.logLevels.includes('warn') && this.shouldLog(context)) {
         super.warn(message, context);
      }
   }

   debug(message: string, context?: string) {
      if (message === undefined) return;
      if (this.logLevels.includes('debug') && this.shouldLog(context)) {
         super.debug(message, context);
      }
   }

   verbose(message: string, context?: string) {
      if (message === undefined) return;
      if (this.logLevels.includes('verbose') && this.shouldLog(context)) {
         super.verbose(message, context);
      }
   }
}
