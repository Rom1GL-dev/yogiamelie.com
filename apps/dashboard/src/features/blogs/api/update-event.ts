import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';
import { UpdateBlogForm } from '@/features/blogs/types/update-blog.ts';

const BASE_URL = '/v1/blogs';

const updateEvent = async (payload: Partial<UpdateBlogForm>) => {
  return api.put<GenericResponse>(`${BASE_URL}`, payload);
};

export const useUpdateBlog = () => {
  return useMutation({
    mutationKey: ['update-blog'],
    mutationFn: async (payload: Partial<UpdateBlogForm>) => updateEvent(payload)
  });
};
