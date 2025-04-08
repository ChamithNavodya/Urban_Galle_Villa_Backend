import {
   MealPlanType,
   PaymentMethod,
   RatePlanStatus,
   RatePlanTypes,
   StayDurationType,
} from 'src/enums/rate-plan.enums';

export class RatePlanResponseDto {
   ///////////////
   ratePlanId: number;
   name: string;
   description: string;
   isActive: boolean;
   minimumStay: number;
   maximumStay?: number;
   basePrice: number;
   discountPercentage: number;
   isDateSpecific: boolean;
   dateRanges: Array<{ from: Date; to: Date }>;
   hasBlackoutDates: boolean;
   blackoutDates: Array<{ from: Date; to: Date }>;
   durationType: StayDurationType;
   ratePlanType: RatePlanTypes;
   ratePlanStatus: RatePlanStatus;
   customStayLength: number;
   mealPlan: MealPlanType;
   amenitiesIncluded: string[];
   customInclusions: string[];
   isRefundable: boolean;
   refundWindow: number;
   cancellationPolicy: string;
   paymentTerms: PaymentMethod;
   createdAt: Date;
   updatedAt: Date;
   applicableRooms: Array<{
      roomId: number;
      name: string;
   }>;
}
