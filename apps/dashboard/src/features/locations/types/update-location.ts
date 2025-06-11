import { z } from 'zod';

export const UpdateLocationFormSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  lieu: z.string().optional(),
  parking: z.string().optional(),
  planning: z.string().optional(),
  image: z.string().optional()
});

export type UpdateLocationForm = z.infer<typeof UpdateLocationFormSchema>;
