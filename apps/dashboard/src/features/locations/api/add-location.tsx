import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';

export interface AddLocationDto {
  title: string;
  subtitle: string;
  lieu?: string;
  parking?: string;
  planning?: string;
  image: string | File;
  published: boolean;
}

const BASE_URL = '/v1/location';

const addLocation = async (payload: AddLocationDto) => {
  return api.post<GenericResponse>(`${BASE_URL}`, payload);
};

export const useAddLocation = () => {
  return useMutation({
    mutationKey: ['add-location'],
    mutationFn: async (payload: AddLocationDto) => addLocation(payload)
  });
};
