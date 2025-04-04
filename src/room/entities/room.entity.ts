import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
} from 'typeorm';
import { RoomType, BedType } from 'src/enums';

@Entity()
export class Room {
   @PrimaryGeneratedColumn()
   roomId: number;

   @Column({ length: 100 })
   name: string;

   @Column({ type: 'enum', enum: RoomType })
   type: RoomType;

   @Column('decimal', { precision: 10, scale: 2, name: 'original_price' })
   originalPrice: number;

   @Column('decimal', { precision: 10, scale: 2, name: 'current_price' })
   currentPrice: number;

   @Column('smallint')
   discount: number; // Percentage (0-100)

   @Column('smallint', { name: 'max_guests' })
   maxGuests: number;

   @Column({ type: 'enum', enum: BedType, name: 'bed_type' })
   bedType: BedType;

   @Column({ length: 20 })
   size: string; // e.g. "21 m²"

   @Column('text', { array: true, nullable: true })
   views: string[];

   @Column('text', { array: true })
   amenities: string[];

   @Column('boolean', { default: false })
   breakfast: boolean;

   @Column('boolean', { default: false })
   refundable: boolean;

   @Column('boolean', { name: 'prepayment_required', default: false })
   prepaymentRequired: boolean;

   @Column('boolean', { name: 'genius_discount', default: false })
   geniusDiscount: boolean;

   @Column('smallint')
   availability: number; // Number of available rooms

   @Column('text', { array: true })
   images: string[];

   @Column('text', { nullable: true })
   description: string;

   @Column('boolean', { name: 'is_available', default: true })
   isAvailable: boolean;

   @Column('boolean', { name: 'is_active', default: true })
   isActive: boolean;

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at' })
   updatedAt: Date;
}
