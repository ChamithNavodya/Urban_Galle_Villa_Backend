import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RatePlanService } from './rate-plan.service';
import { CustomLoggerService } from 'src/logger/custom-logger.service';
import { CreateRatePlanDto } from './dto/create-rate-plan.dto';
import { RatePlanResponseDto } from './dto/rate-plan-response.dto';
import { GetRatePlanByIdDto } from './dto/get-rate-by-id.dto';
import { UpdateRatePlanDto } from './dto/update-rate-plan.dto';
import { StatusChangeRatePlanDto } from './dto/change-status.dto';

@Controller('rate-plan')
export class RatePlanController {
   constructor(
      private readonly ratePlanService: RatePlanService,
      private readonly logger: CustomLoggerService,
   ) {
      this.logger.setContext(RatePlanController.name);
   }

   @Post('create')
   async createRatePlan(@Body() createRatePlanDto: CreateRatePlanDto) {
      return await this.ratePlanService.createRatePlan(createRatePlanDto);
   }

   @Get('all')
   async getAllRatePlans(): Promise<RatePlanResponseDto[]> {
      return await this.ratePlanService.getAllRatePlans();
   }

   @Get('view/:ratePlanId')
   async getRoomById(
      @Param() params: GetRatePlanByIdDto,
   ): Promise<RatePlanResponseDto> {
      const ratePlanId = Number(params.ratePlanId);
      return this.ratePlanService.getRatePlanById(ratePlanId);
   }

   @Post('update/:ratePlanId')
   async updateRatePlan(
      @Param('ratePlanId') ratePlanId: number,
      @Body() updateRatePlanDto: UpdateRatePlanDto,
   ) {
      if (!ratePlanId) throw new Error('Rate plan ID required!');
      return await this.ratePlanService.updateRatePlan(
         ratePlanId,
         updateRatePlanDto,
      );
   }

   @Post('change-status')
   async updateRatePlanStatus(
      @Body() changeStatusDto: StatusChangeRatePlanDto,
   ): Promise<RatePlanResponseDto> {
      return await this.ratePlanService.updateRatePlanStatus(
         changeStatusDto.ratePlanId,
         changeStatusDto.newStatus,
      );
   }

   @Get('delete/:ratePlanId')
   async deleteRoom(@Param('ratePlanId') ratePlanId: number) {
      return await this.ratePlanService.deleteRatePlan(ratePlanId);
   }
}
