import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ical from 'node-ical';
import { CustomLoggerService } from 'src/logger/custom-logger.service';
import { DateTime } from 'luxon';

@Injectable()
export class CalendarService {
   private readonly appTimezone: string;
   constructor(
      private readonly config: ConfigService,
      private readonly logger: CustomLoggerService,
   ) {
      this.logger.setContext(CalendarService.name);
      this.appTimezone = this.config.get<string>('appTimezone');
   }
   async fetchBookings(icalUrl: string) {
      try {
         const data = await ical.fromURL(icalUrl);
         const bookings = Object.values(data)
            .filter((event) => event.type === 'VEVENT') // Only keep booking events
            .map((event) => ({
               startDate: new Date(event.start),
               endDate: new Date(event.end),
               summary: event.summary,
            }));
         return bookings;
      } catch (error) {
         console.error('Error fetching iCal:', error);
         return [];
      }
   }

   private convertToUTC(date: Date): Date {
      return DateTime.fromJSDate(date).toUTC().toJSDate();
   }
}
