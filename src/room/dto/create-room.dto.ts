import {
   IsString,
   IsEnum,
   IsNumber,
   IsArray,
   IsOptional,
   IsBoolean,
   IsPositive,
   Min,
   Max,
   ArrayNotEmpty,
   Matches,
   Length,
   MaxLength,
} from 'class-validator';
import { RoomType } from 'src/enums';
import { BedType } from 'src/enums';

export class CreateRoomDto {
   @IsString({ message: 'Room name must be a string' })
   @Length(2, 100, {
      message: 'Room name must be between 2 and 100 characters',
   })
   name: string;

   @IsEnum(RoomType, { message: 'Invalid room type' })
   type: RoomType;

   @IsNumber({}, { message: 'Original price must be a number' })
   @IsPositive({ message: 'Original price must be positive' })
   @Max(1000000, { message: 'Price seems too high' })
   originalPrice: number;

   @IsNumber({}, { message: 'Current price must be a number' })
   @IsPositive({ message: 'Current price must be positive' })
   @Max(1000000, { message: 'Price seems too high' })
   currentPrice: number;

   @IsNumber({}, { message: 'Discount must be a number' })
   @Min(0, { message: 'Discount cannot be negative' })
   @Max(100, { message: 'Discount cannot exceed 100%' })
   discount: number;

   @IsNumber({}, { message: 'Max guests must be a number' })
   @IsPositive({ message: 'Max guests must be positive' })
   @Max(20, { message: 'Max guests cannot exceed 20' })
   maxGuests: number;

   @IsEnum(BedType, { message: 'Invalid bed type' })
   bedType: BedType;

   @IsString({ message: 'Size must be a string' })
   @Matches(/^\d+\s?m²$/, {
      message: 'Size must be in format like "21 m²"',
   })
   size: string;

   @IsArray()
   @IsString({ each: true, message: 'Each view must be a string' })
   @ArrayNotEmpty({ message: 'Views array cannot be empty' })
   @IsOptional()
   views?: string[];

   @IsArray()
   @IsString({ each: true, message: 'Each amenity must be a string' })
   @ArrayNotEmpty({ message: 'Amenities array cannot be empty' })
   amenities: string[];

   @IsBoolean({ message: 'Breakfast option must be true or false' })
   breakfast: boolean;

   @IsBoolean({ message: 'Refundable must be true or false' })
   refundable: boolean;

   @IsBoolean({ message: 'Prepayment required must be true or false' })
   prepaymentRequired: boolean;

   @IsBoolean({ message: 'Genius discount must be true or false' })
   geniusDiscount: boolean;

   @IsNumber({}, { message: 'Availability must be a number' })
   @Min(0, { message: 'Availability cannot be negative' })
   availability: number;

   @IsArray()
   @ArrayNotEmpty({ message: 'Images array cannot be empty' })
   images: string[];

   @IsString({ message: 'Description must be a string' })
   @IsOptional()
   @MaxLength(1000, {
      message: 'Description cannot exceed 1000 characters',
   })
   description?: string;

   @IsBoolean({ message: 'Availability status must be true or false' })
   @IsOptional()
   isAvailable?: boolean;

   @IsBoolean({ message: 'Active status must be true or false' })
   @IsOptional()
   isActive?: boolean;
}
