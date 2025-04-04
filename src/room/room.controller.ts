import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './entities/room.entity';
import { CustomLoggerService } from 'src/logger/custom-logger.service';
import { GetRoomByIdDto } from './dto/get-room-by-id.dto';

@Controller('room')
export class RoomController {
   constructor(
      private readonly roomService: RoomService,
      private readonly logger: CustomLoggerService,
   ) {
      this.logger.setContext(RoomController.name);
   }

   @Post('create')
   async createRoom(@Body() createRoomDto: CreateRoomDto) {
      return await this.roomService.createRoom(createRoomDto);
   }

   @Get('all')
   async getAllRooms(): Promise<Room[]> {
      return this.roomService.getAllRooms();
   }

   @Get('view/:roomId')
   async getRoomById(@Param() params: GetRoomByIdDto): Promise<Room> {
      const roomId = Number(params.roomId);
      return this.roomService.getRoomById(roomId);
   }
}
