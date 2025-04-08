import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomType } from 'src/modules/settings/entities/room-type.entity';
import { BedType } from 'src/modules/settings/entities/bed-type.entity';
import { Amenity } from 'src/modules/settings/entities/amenity.entity';
import { PrivacyPolicy } from 'src/modules/settings/entities/privacy-policy.entity';
import { roomTypes } from './data/room-types.data';
import { bedTypes } from './data/bed-types.data';
import { amenities } from './data/amenities.data';
import { privacyPolicies } from './data/privacy-policies.data';

@Injectable()
export class SeederService {
   private readonly logger = new Logger(SeederService.name);

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

   async seed() {
      await this.runSeeders();
   }
   private async runSeeders() {
      try {
         await this.seedEntity(this.roomTypeRepo, roomTypes, 'RoomTypes');
         await this.seedEntity(this.bedTypeRepo, bedTypes, 'BedTypes');
         await this.seedEntity(this.amenityRepo, amenities, 'Amenities');
         await this.seedEntity(
            this.policyRepo,
            privacyPolicies,
            'PrivacyPolicies',
         );
      } catch (error) {
         this.logger.error('Seeding failed', error.stack);
         throw error;
      }
   }
   private async seedEntity<T>(
      repository: Repository<T>,
      data: Partial<T>[],
      entityName: string,
   ) {
      const count = await repository.count();
      if (count > 0) {
         this.logger.log(`${entityName} already seeded - skipping`);
         return;
      }

      await repository.save(data as any);
      this.logger.log(
         `${entityName} seeded successfully (${data.length} records)`,
      );
   }
}
