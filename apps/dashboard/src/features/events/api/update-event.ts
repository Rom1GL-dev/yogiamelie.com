import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';
import { UpdateEventForm } from '@/features/events/types/update-event.ts';

const BASE_URL = '/v1/events';

const updateEvent = async (payload: Partial<UpdateEventForm>) => {
  return api.put<GenericResponse>(`${BASE_URL}`, payload);
};

export const useUpdateEvent = () => {
  return useMutation({
    mutationKey: ['update-event'],
    mutationFn: async (payload: Partial<UpdateEventForm>) =>
      updateEvent(payload)
  });
};
