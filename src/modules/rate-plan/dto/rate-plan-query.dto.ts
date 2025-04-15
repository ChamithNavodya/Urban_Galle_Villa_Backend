import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { RatePlanStatus, RatePlanTypes } from 'src/enums/rate-plan.enums';

export class RatePlanQueryDto {
   @IsOptional()
   @IsNumber()
   @Type(() => Number)
   page?: number = 1;

   @IsOptional()
   @IsNumber()
   @Type(() => Number)
   limit?: number = 10;

   @IsOptional()
   @IsEnum(RatePlanTypes)
   ratePlanType?: RatePlanTypes;

   @IsOptional()
   @IsEnum(RatePlanStatus)
   ratePlanStatus?: RatePlanStatus;

   @IsOptional()
   @IsNumber({}, { each: true })
   @Type(() => Number)
   roomIds?: number[];

   @IsOptional()
   search?: string;
}
