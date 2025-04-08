import {
   Controller,
   Post,
   UseInterceptors,
   UploadedFiles,
   BadRequestException,
   HttpCode,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
   constructor(private readonly uploadService: UploadService) {}

   @Post('room-images')
   @HttpCode(201)
   @UseInterceptors(FilesInterceptor('images', 10)) // Max 10 files
   async uploadRoomImages(
      @UploadedFiles() files: Express.Multer.File[],
   ): Promise<{ data: string[]; message: string }> {
      console.log('Upload started');
      if (!files || files.length === 0) {
         throw new BadRequestException('No files uploaded');
      }
      return this.uploadService.uploadImages(files);
   }
}
