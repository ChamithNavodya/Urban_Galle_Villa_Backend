import { PrivacyPolicy } from 'src/modules/settings/entities/privacy-policy.entity';

export const privacyPolicies: Partial<PrivacyPolicy>[] = [
   {
      value: 'standard',
      label: 'Standard Policy',
      content: 'We collect basic information for reservation purposes only...',
      isActive: true,
   },
   {
      value: 'gdpr',
      label: 'GDPR Compliant',
      content: 'In compliance with EU GDPR regulations, we...',
      isActive: true,
   },
   {
      value: 'strict',
      label: 'Strict Privacy',
      content: 'We do not share any personal information with third parties...',
      isActive: true,
   },
];
