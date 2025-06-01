import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';

export interface AddBlogDto {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  published: boolean;
}

const BASE_URL = '/v1/blogs';

const addBlog = async (payload: AddBlogDto) => {
  return api.post<GenericResponse>(`${BASE_URL}`, payload);
};

export const useAddBlog = () => {
  return useMutation({
    mutationKey: ['add-blog'],
    mutationFn: async (payload: AddBlogDto) => addBlog(payload)
  });
};
