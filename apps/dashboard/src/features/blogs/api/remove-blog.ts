import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';

export interface DeleteBlogDto {
  id: string;
}

const BASE_URL = '/v1/blogs';

const deleteEvent = async (payload: DeleteBlogDto) => {
  return api.delete<GenericResponse>(`${BASE_URL}`, { data: payload });
};

export const useDeleteBlog = () => {
  return useMutation({
    mutationKey: ['delete-blog'],
    mutationFn: async (payload: DeleteBlogDto) => deleteEvent(payload)
  });
};
