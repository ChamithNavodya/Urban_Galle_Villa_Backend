import { IsNotEmpty } from 'class-validator';

export class UploadImageDto {
   @IsNotEmpty()
   images: Express.Multer.File[];
}
