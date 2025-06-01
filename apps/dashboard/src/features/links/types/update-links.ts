import { z } from 'zod';

export const UpdateLinksFormSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional()
});

export type UpdateLinksForm = z.infer<typeof UpdateLinksFormSchema>;
