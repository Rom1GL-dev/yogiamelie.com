import { z } from 'zod';

export const UpdateBlogFormSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  published: z.boolean().optional()
});

export type UpdateBlogForm = z.infer<typeof UpdateBlogFormSchema>;
