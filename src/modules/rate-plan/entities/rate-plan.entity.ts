import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToMany,
   JoinTable,
} from 'typeorm';
import { Room } from '../../room/entities/room.entity';
import {
   MealPlanType,
   PaymentMethod,
   RatePlanStatus,
   RatePlanTypes,
   StayDurationType,
} from 'src/enums/rate-plan.enums';

@Entity()
export class RatePlan {
   @PrimaryGeneratedColumn()
   ratePlanId: number;

   // General Details
   @Column()
   name: string;

   @Column('text')
   description: string;

   @ManyToMany(() => Room)
   @JoinTable()
   applicableRooms: Room[];

   @Column({ default: true })
   isActive: boolean;

   @Column()
   minimumStay: number;

   @Column({ nullable: true })
   maximumStay?: number;

   @Column('decimal', { precision: 10, scale: 2 })
   basePrice: number;

   @Column('decimal', { precision: 5, scale: 2 })
   discountPercentage: number;

   @Column({ type: 'enum', enum: RatePlanStatus })
   ratePlanStatus: RatePlanStatus;

   // Duration & Date Rules
   @Column({ type: 'enum', enum: RatePlanTypes })
   ratePlanType: RatePlanTypes;

   @Column()
   isDateSpecific: boolean;

   @Column('jsonb')
   dateRanges: Array<{ from: Date; to: Date }>;

   @Column()
   hasBlackoutDates: boolean;

   @Column('jsonb')
   blackoutDates: Array<{ from: Date; to: Date }>;

   @Column({ type: 'enum', enum: StayDurationType })
   durationType: StayDurationType;

   @Column()
   customStayLength: number;

   // Meals & Amenities
   @Column({ type: 'enum', enum: MealPlanType })
   mealPlan: MealPlanType;

   @Column('simple-array')
   amenitiesIncluded: string[];

   @Column('simple-array')
   customInclusions: string[];

   // Policies & Cancellation
   @Column()
   isRefundable: boolean;

   @Column()
   refundWindow: number;

   @Column('text')
   cancellationPolicy: string;

   @Column({ type: 'enum', enum: PaymentMethod })
   paymentTerms: PaymentMethod;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;
}
