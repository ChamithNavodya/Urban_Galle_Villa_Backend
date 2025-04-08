import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RoomType {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   value: string;

   @Column()
   label: string;

   @Column({ nullable: true })
   description?: string;

   @Column({ default: true })
   isActive: boolean;

   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   createdAt: Date;
}
