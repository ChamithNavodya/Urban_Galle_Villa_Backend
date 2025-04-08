// src/modules/settings/settings.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomType } from './entities/room-type.entity';
import { BedType } from './entities/bed-type.entity';
import { Amenity } from './entities/amenity.entity';
import { PrivacyPolicy } from './entities/privacy-policy.entity';

@Injectable()
export class SettingsService {
   constructor(
      @InjectRepository(RoomType)
      private readonly roomTypeRepo: Repository<RoomType>,
      @InjectRepository(BedType)
      private readonly bedTypeRepo: Repository<BedType>,
      @InjectRepository(Amenity)
      private readonly amenityRepo: Repository<Amenity>,
      @InjectRepository(PrivacyPolicy)
      private readonly policyRepo: Repository<PrivacyPolicy>,
   ) {}

   async getAllDropdowns() {
      const [roomTypes, bedTypes, amenities, privacyPolicies] =
         await Promise.all([
            this.getActiveRoomTypes(),
            this.getActiveBedTypes(),
            this.getActiveAmenities(),
            this.getActivePrivacyPolicies(),
         ]);

      return { roomTypes, bedTypes, amenities, privacyPolicies };
   }

   async getActiveRoomTypes() {
      return this.roomTypeRepo.find({
         where: { isActive: true },
         order: { label: 'ASC' },
      });
   }

   async getActiveBedTypes() {
      return this.bedTypeRepo.find({
         where: { isActive: true },
         order: { label: 'ASC' },
      });
   }

   async getActiveAmenities() {
      return this.amenityRepo.find({
         where: { isActive: true },
         order: { label: 'ASC' },
      });
   }

   async getActivePrivacyPolicies() {
      return this.policyRepo.find({
         where: { isActive: true },
         order: { label: 'ASC' },
      });
   }
}
