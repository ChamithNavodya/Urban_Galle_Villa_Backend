import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PrivacyPolicy {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   value: string;

   @Column()
   label: string;

   @Column({ type: 'text' })
   content: string;

   @Column({ default: true })
   isActive: boolean;
}
