import { Controller, Get, Query } from '@nestjs/common';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
   constructor(private readonly calendarService: CalendarService) {}

   @Get('availability')
   async getAvailability(@Query('room') room: string) {
      const roomIcalLinks = {
         room1: 'http://localhost:4141/room1.ics',
         room2: 'http://localhost:4141/room2.ics',
         room3: 'http://localhost:4141/room3.ics',
         room4: 'http://localhost:4141/room4.ics',
         villa: 'http://localhost:4141/villa.ics',
      };

      if (!roomIcalLinks[room]) {
         return { error: 'Invalid room' };
      }

      const bookings = await this.calendarService.fetchBookings(
         roomIcalLinks[room],
      );
      return { room, bookings };
   }
}
