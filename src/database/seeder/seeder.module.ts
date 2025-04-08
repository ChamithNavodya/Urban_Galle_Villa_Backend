// src/database/seeders/seeder.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { RoomType } from 'src/modules/settings/entities/room-type.entity';
import { BedType } from 'src/modules/settings/entities/bed-type.entity';
import { Amenity } from 'src/modules/settings/entities/amenity.entity';
import { PrivacyPolicy } from 'src/modules/settings/entities/privacy-policy.entity';

@Module({
   imports: [
      TypeOrmModule.forFeature([RoomType, BedType, Amenity, PrivacyPolicy]),
   ],
   providers: [SeederService],
   exports: [SeederService],
})
export class SeederModule {}
