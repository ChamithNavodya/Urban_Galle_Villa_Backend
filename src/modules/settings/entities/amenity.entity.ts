import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Amenity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   value: string;

   @Column()
   label: string;

   @Column({ nullable: true })
   category: string; // e.g., 'general', 'bathroom', 'media'

   @Column({ nullable: true })
   icon?: string;

   @Column({ default: true })
   isActive: boolean;
}
