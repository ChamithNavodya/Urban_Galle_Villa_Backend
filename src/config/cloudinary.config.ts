// config/cloudinary.config.ts
import { registerAs } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export default registerAs('cloudinary', () => ({
   cloudName: process.env.CLOUDINARY_CLOUD_NAME,
   apiKey: process.env.CLOUDINARY_API_KEY,
   apiSecret: process.env.CLOUDINARY_API_SECRET,
}));

export const CloudinaryProvider = {
   provide: 'CLOUDINARY',
   useFactory: () => {
      cloudinary.config({
         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
         api_key: process.env.CLOUDINARY_API_KEY,
         api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      return cloudinary;
   },
};
