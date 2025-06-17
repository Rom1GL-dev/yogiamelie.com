import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';

export interface AddPriceDto {
  label: string;
  number: string;
  extra?: string;
  price: string;
  info?: string;
}

const BASE_URL = '/v1/prices';

const addPrice = async (payload: AddPriceDto) => {
  return api.post<GenericResponse>(`${BASE_URL}`, payload);
};

export const useAddPrice = () => {
  return useMutation({
    mutationKey: ['add-price'],
    mutationFn: async (payload: AddPriceDto) => addPrice(payload)
  });
};
