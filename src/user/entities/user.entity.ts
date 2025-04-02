import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
} from 'typeorm';
import { AuthProvider } from 'src/enums';

@Entity()
export class User {
   @PrimaryGeneratedColumn('uuid')
   userId: string;

   @Column()
   firstName: string;

   @Column()
   lastName: string;

   @Column()
   fullName: string;

   @Column({ unique: true })
   email: string;

   @Column({ nullable: true })
   password: string;

   @Column({ default: true })
   isActive: boolean;

   @Column({
      type: 'enum',
      enum: AuthProvider,
      default: AuthProvider.LOCAL,
   })
   provider: AuthProvider;

   @Column({ nullable: true })
   providerId: string;

   @Column({ nullable: true })
   avatar: string;

   @Column({ nullable: true, default: false })
   emailVerified: boolean;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;
}
