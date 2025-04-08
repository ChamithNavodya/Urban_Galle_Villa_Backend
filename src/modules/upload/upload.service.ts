import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary, UploadApiResponse } from 'cloudinary';
import { UploadResponseDto } from './dto/upload-response.dto';

@Injectable()
export class UploadService {
   constructor(
      @Inject('CLOUDINARY') private readonly cloudinary: typeof Cloudinary,
   ) {}

   async uploadImages(
      files: Express.Multer.File[],
   ): Promise<UploadResponseDto> {
      try {
         const uploadPromises = files.map((file) => {
            return new Promise<UploadApiResponse>((resolve, reject) => {
               const originalName = file.originalname.split('.')[0];
               const uniqueName = `${originalName}-${Date.now()}`;

               const uploadStream = this.cloudinary.uploader.upload_stream(
                  { folder: 'urban/rooms/', public_id: uniqueName },
                  (error, result) => {
                     if (error) reject(error);
                     else resolve(result);
                  },
               );
               uploadStream.end(file.buffer);
            });
         });

         const results = await Promise.all(uploadPromises);
         const urls = results.map((result) => result.secure_url);
         return {
            data: urls,
            message: 'Images uploaded successfully',
         };
      } catch (error) {
         throw new Error(`Failed to upload images: ${error.message}`);
      }
   }
}
