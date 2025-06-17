import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';
import { UpdatePriceForm } from '@/features/prices/types/update-price.ts';

const BASE_URL = '/v1/prices';

const updatePrice = async (payload: Partial<UpdatePriceForm>) => {
  return api.put<GenericResponse>(`${BASE_URL}`, payload);
};

export const useUpdatePrice = () => {
  return useMutation({
    mutationKey: ['update-price'],
    mutationFn: async (payload: Partial<UpdatePriceForm>) =>
      updatePrice(payload)
  });
};
