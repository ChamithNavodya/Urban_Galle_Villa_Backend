import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { CalendarModule } from './calendar/calendar.module';
import { RoomModule } from './room/room.module';
import appConfig from './config/app.config';
import loggerConfig from './logger/logger.config';

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
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
