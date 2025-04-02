// src/database/database.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { CustomLoggerService } from '../logger/custom-logger.service'; // Import your custom logger
import { LoggerModule } from 'src/logger/logger.module';

@Module({
   imports: [
      TypeOrmModule.forRootAsync({
         useFactory: (config: ConfigService) => ({
            type: 'postgres',
            url: config.get<string>('databaseURL'),
            autoLoadEntities: true,
            synchronize: process.env.NODE_ENV !== 'production',
         }),
         inject: [ConfigService],
      }),
      LoggerModule,
   ],
   exports: [TypeOrmModule],
})
export class DatabaseModule implements OnModuleInit {
   constructor(
      private readonly configService: ConfigService,
      private readonly logger: CustomLoggerService,
   ) {
      logger.setContext('DatabaseModule');
   }

   async onModuleInit() {
      try {
         const dataSource = new DataSource({
            type: 'postgres',
            url: this.configService.get<string>('databaseURL'),
            synchronize: process.env.NODE_ENV !== 'production',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
         });

         await dataSource.initialize();
         this.logger.log('Database connection established successfully.');
      } catch (error) {
         console.log('DB Weda na', error);
         this.logger.error('Database connection error: ' + error.message);
         throw new Error('Database connection failed: ' + error.message);
      }
   }
}
