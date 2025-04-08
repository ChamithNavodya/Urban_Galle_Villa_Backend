import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BedType {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   value: string;

   @Column()
   label: string;

   @Column({ nullable: true })
   icon?: string; // For frontend icon class

   @Column({ default: true })
   isActive: boolean;
}
