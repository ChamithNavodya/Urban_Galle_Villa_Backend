import { BedType } from 'src/modules/settings/entities/bed-type.entity';

export const bedTypes: Partial<BedType>[] = [
   {
      value: 'single',
      label: 'Single Bed',
      isActive: true,
   },
   {
      value: 'twin',
      label: 'Twin Beds',
      isActive: true,
   },
   {
      value: 'double',
      label: 'Double Bed',
      isActive: true,
   },
   {
      value: 'queen',
      label: 'Queen Bed',
      isActive: true,
   },
   {
      value: 'king',
      label: 'King Bed',
      isActive: true,
   },
   {
      value: 'sofa',
      label: 'Sofa Bed',
      isActive: true,
   },
];
