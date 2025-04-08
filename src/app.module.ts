import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { RoomModule } from './modules/room/room.module';
import { UploadModule } from './modules/upload/upload.module';
import { SettingsModule } from './modules/settings/settings.module';
import appConfig from './config/app.config';
import loggerConfig from './logger/logger.config';
import { SeederModule } from './database/seeder/seeder.module';
import { RatePlanModule } from './modules/rate-plan/rate-plan.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         load: [appConfig, loggerConfig],
         isGlobal: true,
      }),
      LoggerModule,
      DatabaseModule,
      UserModule,
      CalendarModule,
      RoomModule,
      UploadModule,
      SettingsModule,
      SeederModule,
      RatePlanModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
