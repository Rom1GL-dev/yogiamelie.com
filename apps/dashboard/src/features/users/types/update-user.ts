import { z } from 'zod';

export const UpdateUserFormSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string(),
  role: z.string().optional()
});

export type UpdateUserForm = z.infer<typeof UpdateUserFormSchema>;
