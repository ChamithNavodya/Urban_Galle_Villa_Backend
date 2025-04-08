import { RoomType } from 'src/modules/settings/entities/room-type.entity';

export const roomTypes: Partial<RoomType>[] = [
   {
      value: 'standard',
      label: 'Standard',
      description: 'Basic room with standard amenities',
      isActive: true,
   },
   {
      value: 'deluxe',
      label: 'Deluxe',
      description: 'Upgraded room with enhanced features',
      isActive: true,
   },
   {
      value: 'suite',
      label: 'Suite',
      description: 'Spacious room with separate living area',
      isActive: true,
   },
   {
      value: 'executive',
      label: 'Executive',
      description: 'Premium room for business travelers',
      isActive: true,
   },
   {
      value: 'family',
      label: 'Family',
      description: 'Large room suitable for families',
      isActive: true,
   },
   {
      value: 'villa',
      label: 'Villa',
      description: 'Private standalone accommodation',
      isActive: true,
   },
];
