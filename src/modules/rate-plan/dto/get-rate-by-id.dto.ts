import { IsNumberString } from 'class-validator';

export class GetRatePlanByIdDto {
   @IsNumberString({}, { message: 'Rate plan ID should be a number' })
   ratePlanId: number;
}
