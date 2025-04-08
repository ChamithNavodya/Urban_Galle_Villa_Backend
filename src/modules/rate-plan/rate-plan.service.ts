import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RatePlan } from './entities/rate-plan.entity';
import { Repository } from 'typeorm';
import { CreateRatePlanDto } from './dto/create-rate-plan.dto';
import { RatePlanResponseDto } from './dto/rate-plan-response.dto';
import { UpdateRatePlanDto } from './dto/update-rate-plan.dto';
import { RatePlanStatus } from 'src/enums/rate-plan.enums';

@Injectable()
export class RatePlanService {
   constructor(
      @InjectRepository(RatePlan)
      private readonly ratePlanRepository: Repository<RatePlan>,
   ) {}

   async createRatePlan(createDto: CreateRatePlanDto): Promise<RatePlan> {
      const numericData = {
         basePrice: parseFloat(createDto.basePrice),
         discountPercentage: parseFloat(createDto.discountPercentage),
      };
      const newRatePlan = this.ratePlanRepository.create({
         ...createDto,
         ...numericData,
         applicableRooms: createDto.applicableRooms.map((id) => ({
            roomId: id,
         })),
      });
      return await this.ratePlanRepository.save(newRatePlan);
   }

   async getAllRatePlans(): Promise<RatePlan[]> {
      return await this.ratePlanRepository
         .createQueryBuilder('ratePlan')
         .leftJoinAndSelect('ratePlan.applicableRooms', 'room')
         .select(['ratePlan', 'room.roomId', 'room.name'])
         .where('ratePlan.isActive = :isActive', { isActive: true })
         .getMany();
   }

   async getRatePlanById(ratePlanId: number): Promise<RatePlanResponseDto> {
      const ratePlan = await this.ratePlanRepository
         .createQueryBuilder('ratePlan')
         .leftJoinAndSelect('ratePlan.applicableRooms', 'room')
         .select(['ratePlan', 'room.roomId', 'room.name'])
         .where('ratePlan.ratePlanId = :ratePlanId', { ratePlanId })
         .getOne();

      if (!ratePlan) {
         throw new Error('Rate plan not found!');
      }
      return ratePlan;
   }

   async updateRatePlan(
      ratePlanId: number,
      updateRatePlanDto: UpdateRatePlanDto,
   ): Promise<RatePlanResponseDto> {
      const existingPlan = await this.ratePlanRepository.findOne({
         where: { ratePlanId },
         relations: ['applicableRooms'], // optional if you want to merge rooms
      });

      if (!existingPlan) throw new NotFoundException('Rate plan not found');

      // Convert necessary string fields to numbers
      const numericData = {
         basePrice: parseFloat(updateRatePlanDto.basePrice),
         discountPercentage: parseFloat(updateRatePlanDto.discountPercentage),
      };

      // If `applicableRooms` is a list of room IDs, convert to Room[] format
      const applicableRooms = updateRatePlanDto.applicableRooms?.map((id) => ({
         roomId: id,
      }));

      const updatedEntity = this.ratePlanRepository.create({
         ...existingPlan,
         ...updateRatePlanDto,
         ...numericData,
         applicableRooms,
      });

      await this.ratePlanRepository.save(updatedEntity);
      return this.getRatePlanById(ratePlanId);
   }

   async updateRatePlanStatus(
      ratePlanId: number,
      ratePlanStatus: RatePlanStatus,
   ): Promise<RatePlanResponseDto> {
      const ratePlan = await this.ratePlanRepository.findOne({
         where: { ratePlanId },
      });
      if (!ratePlan) {
         throw new NotFoundException('Rate plan not found');
      }
      ratePlan.ratePlanStatus = ratePlanStatus;
      await this.ratePlanRepository.save(ratePlan);

      return this.getRatePlanById(ratePlanId);
   }

   async deleteRatePlan(ratePlanId: number): Promise<RatePlanResponseDto> {
      await this.ratePlanRepository.update(ratePlanId, { isActive: false });
      return this.getRatePlanById(ratePlanId);
   }
}
