import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';

export interface DeleteLocationDto {
  title: string;
}

const BASE_URL = '/v1/location';

const deleteLocation = async (payload: DeleteLocationDto) => {
  return api.delete<GenericResponse>(`${BASE_URL}`, { data: payload });
};

export const useDeleteLocation = () => {
  return useMutation({
    mutationKey: ['delete-location'],
    mutationFn: async (payload: DeleteLocationDto) => deleteLocation(payload)
  });
};
