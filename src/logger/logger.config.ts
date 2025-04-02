import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
   logLevels: process.env.LOG_LEVELS || 'log,error,warn,debug,verbose',
   excludedContexts:
      process.env.LOG_EXCLUDED_CONTEXTS ||
      'RouterExplorer,InstanceLoader,RoutesResolver',
}));
