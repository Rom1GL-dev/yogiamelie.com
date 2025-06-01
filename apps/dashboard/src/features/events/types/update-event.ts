import { z } from 'zod';

export const UpdateEventFormSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  type: z.string().optional(),
  image: z.string().optional(),
  linkRegister: z.string().optional(),
  location: z.string().optional()
});

export type UpdateEventForm = z.infer<typeof UpdateEventFormSchema>;
