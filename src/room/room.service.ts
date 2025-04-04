import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
   constructor(
      @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
   ) {}

   async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
      const room = this.roomRepository.create(createRoomDto);
      return await this.roomRepository.save(room);
   }

   async getAllRooms(): Promise<Room[]> {
      return this.roomRepository.find();
   }

   async getRoomById(roomId: number): Promise<Room> {
      return this.roomRepository.findOne({ where: { roomId: roomId } });
   }
}
