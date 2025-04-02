export default () => ({
   port: parseInt(process.env.PORT, 10) || 4002,
   logLevels: process.env.LOG_LEVELS,
   logExcludedContexts: process.env.LOG_EXCLUDED_CONTEXTS,
   databaseURL: process.env.DATABASE_URL,
});
