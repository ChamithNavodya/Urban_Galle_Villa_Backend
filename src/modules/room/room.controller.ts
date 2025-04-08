import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './entities/room.entity';
import { CustomLoggerService } from 'src/logger/custom-logger.service';
import { GetRoomByIdDto } from './dto/get-room-by-id.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

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

   @Post('update/:roomId')
   async updateRoom(
      @Param('roomId') roomId: number,
      @Body() updateRoomDto: UpdateRoomDto,
   ) {
      return await this.roomService.updateRoom(roomId, updateRoomDto);
   }

   @Post('delete/:roomId')
   async deleteRoom(@Param('roomId') roomId: number) {
      return await this.roomService.deleteRoom(roomId);
   }

   @Get('list') // This will return only the roomId and room name
   async getRoomList() {
      return await this.roomService.getRoomsWithFilters({ isActive: true }, [
         'roomId',
         'name',
      ]);
   }
}
