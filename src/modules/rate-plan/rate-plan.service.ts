import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RatePlan } from './entities/rate-plan.entity';
import { Repository } from 'typeorm';
import { CreateRatePlanDto } from './dto/create-rate-plan.dto';
import { RatePlanResponseDto } from './dto/rate-plan-response.dto';
import { UpdateRatePlanDto } from './dto/update-rate-plan.dto';
import { RatePlanStatus } from 'src/enums/rate-plan.enums';
import { RatePlanQueryDto } from './dto/rate-plan-query.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

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

   async getAllRatePlans(
      query: RatePlanQueryDto,
   ): Promise<PaginatedResponse<RatePlan>> {
      const {
         page = 1,
         limit = 10,
         ratePlanType,
         ratePlanStatus,
         roomIds,
      } = query;
      const skip = (page - 1) * limit;

      const queryBuilder = this.ratePlanRepository
         .createQueryBuilder('ratePlan')
         .leftJoinAndSelect('ratePlan.applicableRooms', 'room')
         .select(['ratePlan', 'room.roomId', 'room.name'])
         .orderBy('ratePlan.updatedAt', 'DESC') // Sort by updatedAt in descending order
         .take(limit)
         .skip(skip);

      // Apply filters
      if (ratePlanType) {
         queryBuilder.andWhere('ratePlan.ratePlanType = :ratePlanType', {
            ratePlanType,
         });
      }

      if (ratePlanStatus) {
         queryBuilder.andWhere('ratePlan.ratePlanStatus = :ratePlanStatus', {
            ratePlanStatus,
         });
      }

      if (roomIds && roomIds.length > 0) {
         queryBuilder.andWhere('room.roomId IN (:...roomIds)', { roomIds });
      }

      if (query.search) {
         const trimmedSearchText = query.search.trim();
         if (trimmedSearchText) {
            queryBuilder.andWhere('LOWER(ratePlan.name) LIKE :searchText', {
               searchText: `%${trimmedSearchText.toLowerCase()}%`,
            });
         }
      }

      const [data, total] = await queryBuilder.getManyAndCount();
      console.log(total);
      return {
         data,
         meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
         },
      };
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
