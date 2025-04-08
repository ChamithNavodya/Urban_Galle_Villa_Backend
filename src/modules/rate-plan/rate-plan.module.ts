import { Module } from '@nestjs/common';
import { RatePlanService } from './rate-plan.service';
import { RatePlanController } from './rate-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatePlan } from './entities/rate-plan.entity';

@Module({
   imports: [TypeOrmModule.forFeature([RatePlan])],
   controllers: [RatePlanController],
   providers: [RatePlanService],
})
export class RatePlanModule {}
