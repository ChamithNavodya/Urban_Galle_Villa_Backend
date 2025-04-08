import { Controller, Get } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
   constructor(private readonly settingsService: SettingsService) {}

   @Get('/add-new-room/dropdowns')
   async getDropdowns() {
      return this.settingsService.getAllDropdowns();
   }

   @Get('/fetch-amenities')
   async getAmenities() {
      return this.settingsService.getActiveAmenities();
   }
}
