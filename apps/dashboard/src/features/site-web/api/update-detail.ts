import { api, GenericResponse } from '@/lib/api.ts';
import { useMutation } from '@tanstack/react-query';

export interface UpdateDetailDto {
  id: string;
  contentType: string;
  value: string | File;
  extra?: any;
}

const BASE_URL = '/v1/blogs';

const updateDetail = async (payload: UpdateDetailDto) => {
  return api.put<GenericResponse>(`${BASE_URL}/${payload.id}`, payload);
};

export const useUpdateDetail = () => {
  return useMutation({
    mutationKey: ['update-detail'],
    mutationFn: updateDetail
  });
};
