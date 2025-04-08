import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

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
      return this.roomRepository.findBy({ isActive: true });
   }

   async getRoomById(roomId: number): Promise<Room> {
      const room = await this.roomRepository.findOne({
         where: { roomId: roomId },
      });
      if (!room) {
         throw new Error('Room not found!');
      }
      return room;
   }

   async updateRoom(
      roomId: number,
      updateRoomDto: UpdateRoomDto,
   ): Promise<Room> {
      await this.roomRepository.update(roomId, updateRoomDto);
      return this.getRoomById(roomId);
   }

   async deleteRoom(roomId: number): Promise<Room> {
      await this.roomRepository.update(roomId, { isActive: false });
      return this.getRoomById(roomId);
   }

   async getRoomsWithFilters(
      filters: Partial<Room>,
      selectKeys?: (keyof Room)[],
   ): Promise<Partial<Room>[]> {
      const queryBuilder = this.roomRepository.createQueryBuilder('room');
      Object.entries(filters).forEach(([key, value]) => {
         queryBuilder.andWhere(`room.${key} = :${key}`, { [key]: value });
      });
      if (selectKeys && selectKeys.length > 0) {
         queryBuilder.select(selectKeys.map((key) => `room.${key}`));
      }

      return await queryBuilder.getMany();
   }
}
