import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import appConfig from './config/app.config';
import loggerConfig from './logger/logger.config';

@Module({
   imports: [
      // MongooseModule.forRootAsync({
      //    useFactory: () => ({
      //       uri: appConfig().mongodbURI,
      //    }),
      // }),
      ConfigModule.forRoot({
         load: [appConfig, loggerConfig],
         isGlobal: true,
      }),
      LoggerModule,
      DatabaseModule,
      UserModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
