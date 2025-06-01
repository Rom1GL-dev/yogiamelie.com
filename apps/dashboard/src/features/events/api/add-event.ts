import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';

export interface AddEventDto {
  title: string;
  subtitle?: string;
  description: string;
  startDate: string;
  startHour?: string;
  endDate: string;
  endHour?: string;
  type?: string;
  image: string;
  linkRegister?: string;
  location?: string;
}

const BASE_URL = '/v1/events';

const addEvent = async (payload: AddEventDto) => {
  return api.post<GenericResponse>(`${BASE_URL}`, payload);
};

export const useAddEvent = () => {
  return useMutation({
    mutationKey: ['add-event'],
    mutationFn: async (payload: AddEventDto) => addEvent(payload)
  });
};
