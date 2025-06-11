import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';
import { UpdateLocationForm } from '@/features/locations/types/update-location.ts';

const BASE_URL = '/v1/location';

const updateLocation = async (payload: Partial<UpdateLocationForm>) => {
  return api.put<GenericResponse>(`${BASE_URL}`, payload);
};

export const useUpdateLocation = () => {
  return useMutation({
    mutationKey: ['update-location'],
    mutationFn: async (payload: Partial<UpdateLocationForm>) =>
      updateLocation(payload)
  });
};
