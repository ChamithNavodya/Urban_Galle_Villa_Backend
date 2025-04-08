// src/rooms/entities/room.entity.ts
import { RoomStatus } from 'src/enums';
import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Room {
   @PrimaryGeneratedColumn()
   roomId: number;

   @Column()
   name: string;

   @Column()
   type: string;

   @Column()
   bedType: string;

   @Column()
   numBeds: number;

   @Column()
   size: string;

   @Column()
   maxGuests: number;

   @Column()
   available: string;

   @Column('decimal')
   basePrice: number;

   @Column('text')
   description: string;

   @Column()
   refundable: boolean;

   @Column()
   prepayment: boolean;

   @Column()
   breakfast: boolean;

   @Column('simple-array')
   selectedAmenities: string[];

   @Column('simple-array')
   images: string[];

   @Column()
   totalOccupancy: number;

   @Column()
   limitAdults: boolean;

   @Column()
   maxAdults: number;

   @Column()
   limitChildren: boolean;

   @Column()
   maxChildren: number;

   @Column()
   numBathrooms: number;

   @Column('jsonb') // Stores array of objects
   bathrooms: {
      isPrivate: boolean;
      isInRoom: boolean;
   }[];

   @Column({ type: 'enum', enum: RoomStatus, default: RoomStatus.ACTIVE })
   roomStatus: RoomStatus;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

   @Column({ default: true })
   isActive: boolean;
}
