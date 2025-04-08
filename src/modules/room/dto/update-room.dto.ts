import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsEnum } from 'class-validator';
import { CreateRoomDto } from './create-room.dto';
import { RoomStatus } from 'src/enums';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
   @IsOptional()
   @IsEnum(RoomStatus)
   roomStatus?: RoomStatus;
}
