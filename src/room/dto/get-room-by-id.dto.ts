import { IsNumberString } from 'class-validator';

export class GetRoomByIdDto {
   @IsNumberString({}, { message: 'roomId should be a number' })
   roomId: string;
}
