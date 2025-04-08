import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amenity } from './entities/amenity.entity';
import { RoomType } from './entities/room-type.entity';
import { BedType } from './entities/bed-type.entity';
import { PrivacyPolicy } from './entities/privacy-policy.entity';

@Module({
   imports: [
      TypeOrmModule.forFeature([Amenity, RoomType, BedType, PrivacyPolicy]),
   ],
   controllers: [SettingsController],
   providers: [SettingsService],
})
export class SettingsModule {}
