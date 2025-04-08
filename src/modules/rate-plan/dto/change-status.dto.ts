import { IsNotEmpty } from 'class-validator';
import { RatePlanStatus } from 'src/enums/rate-plan.enums';

export class StatusChangeRatePlanDto {
   @IsNotEmpty()
   ratePlanId: number;

   @IsNotEmpty()
   newStatus: RatePlanStatus;
}
