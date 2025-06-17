import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';

export interface DeletePriceDto {
  id: string;
}

const BASE_URL = '/v1/prices';

const deletePrice = async (payload: DeletePriceDto) => {
  return api.delete<GenericResponse>(`${BASE_URL}`, { data: payload });
};

export const useDeletePrice = () => {
  return useMutation({
    mutationKey: ['delete-price'],
    mutationFn: async (payload: DeletePriceDto) => deletePrice(payload)
  });
};
