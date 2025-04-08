import {
   IsArray,
   IsBoolean,
   IsNumber,
   IsString,
   IsEnum,
   ValidateNested,
   IsOptional,
   IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
   MealPlanType,
   PaymentMethod,
   RatePlanStatus,
   RatePlanTypes,
   StayDurationType,
} from 'src/enums/rate-plan.enums';

class DateRangeDto {
   @IsOptional()
   from?: Date;

   @IsOptional()
   to?: Date;
}

export class CreateRatePlanDto {
   // General Details
   @IsString()
   name: string;

   @IsString()
   description: string;

   @IsArray()
   @IsNumber({}, { each: true })
   applicableRooms: number[];

   @IsBoolean()
   isActive: boolean;

   @IsNumber()
   minimumStay: number;

   @IsOptional()
   @IsNumber()
   maximumStay?: number;

   @IsString()
   basePrice: string;

   @IsString()
   discountPercentage: string;

   // Duration & Date Rules
   @IsBoolean()
   isDateSpecific: boolean;

   @IsArray()
   @ValidateNested({ each: true })
   @Type(() => DateRangeDto)
   dateRanges: DateRangeDto[];

   @IsBoolean()
   hasBlackoutDates: boolean;

   @IsOptional()
   @IsArray()
   @ValidateNested({ each: true })
   @Type(() => DateRangeDto)
   blackoutDates?: DateRangeDto[];

   @IsEnum(StayDurationType)
   durationType: StayDurationType;

   @IsEnum(RatePlanTypes)
   @IsNotEmpty({ message: "'Rate plan type should not be empty'" })
   ratePlanType: RatePlanTypes;

   @IsEnum(RatePlanStatus)
   @IsNotEmpty({ message: "'Rate plan status should not be empty'" })
   ratePlanStatus: RatePlanStatus;

   @IsNumber()
   customStayLength: number;

   // Meals & Amenities
   @IsEnum(MealPlanType)
   mealPlan: MealPlanType;

   @IsArray()
   @IsString({ each: true })
   amenitiesIncluded: string[];

   @IsArray()
   @IsString({ each: true })
   customInclusions: string[];

   // Policies & Cancellation
   @IsBoolean()
   isRefundable: boolean;

   @IsNumber()
   refundWindow: number;

   @IsString()
   cancellationPolicy: string;

   @IsEnum(PaymentMethod)
   paymentTerms: PaymentMethod;
}
