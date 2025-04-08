import {
   IsBoolean,
   IsNumber,
   IsString,
   IsArray,
   ValidateNested,
   IsOptional,
   IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RoomStatus } from 'src/enums';

export class BathroomDto {
   @IsBoolean()
   isPrivate: boolean;

   @IsBoolean()
   isInRoom: boolean;
}

export class CreateRoomDto {
   @IsString()
   name: string;

   @IsString()
   type: string;

   @IsString()
   bedType: string;

   @Type(() => Number)
   @IsNumber()
   numBeds: number;

   @IsString()
   size: string;

   @Type(() => Number)
   @IsNumber()
   maxGuests: number;

   @IsString()
   available: string;

   @Type(() => Number)
   @IsNumber()
   basePrice: number;

   @IsString()
   description: string;

   @IsBoolean()
   refundable: boolean;

   @IsBoolean()
   prepayment: boolean;

   @IsBoolean()
   breakfast: boolean;

   @IsArray()
   @IsString({ each: true })
   selectedAmenities: string[];

   @IsArray()
   @IsString({ each: true })
   images: string[];

   @Type(() => Number)
   @IsNumber()
   totalOccupancy: number;

   @IsBoolean()
   limitAdults: boolean;

   @Type(() => Number)
   @IsNumber()
   maxAdults: number;

   @IsBoolean()
   limitChildren: boolean;

   @Type(() => Number)
   @IsNumber()
   maxChildren: number;

   @Type(() => Number)
   @IsNumber()
   numBathrooms: number;

   @IsOptional()
   @IsEnum(RoomStatus)
   roomStatus?: RoomStatus;

   @ValidateNested({ each: true })
   @Type(() => BathroomDto)
   @IsArray()
   bathrooms: BathroomDto[];
}
