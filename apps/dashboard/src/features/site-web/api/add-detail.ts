import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';

export interface AddDetailDto {
  section: string;
  contentType: string;
  value: string;
  extra?: any;
}

const BASE_URL = '/v1/site-web';

const addBlog = async (payload: AddDetailDto) => {
  return api.post<GenericResponse>(`${BASE_URL}`, payload);
};

export const useAddDetail = () => {
  return useMutation({
    mutationKey: ['add-detail'],
    mutationFn: async (payload: AddDetailDto) => addBlog(payload)
  });
};
