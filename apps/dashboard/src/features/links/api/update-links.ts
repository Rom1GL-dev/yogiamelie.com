import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';
import { UpdateLinksForm } from '@/features/links/types/update-links.ts';

const BASE_URL = '/v1/links';

const updateLinks = async (payload: Partial<UpdateLinksForm>) => {
  return api.post<GenericResponse>(`${BASE_URL}`, payload);
};

export const useUpdateLinks = () => {
  return useMutation({
    mutationKey: ['update-links'],
    mutationFn: async (payload: Partial<UpdateLinksForm>) => {
      updateLinks(payload);
    }
  });
};
