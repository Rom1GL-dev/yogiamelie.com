import { z } from 'zod';

export const UpdatePriceFormSchema = z.object({
  id: z.string(),
  label: z.string().optional(),
  number: z.string().optional(),
  extra: z.string().optional(),
  price: z.string().optional(),
  info: z.string().optional()
});

export type UpdatePriceForm = z.infer<typeof UpdatePriceFormSchema>;
