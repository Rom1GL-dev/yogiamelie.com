import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';

export interface DeleteEventDto {
    id: string;
}

const BASE_URL = '/v1/events';

const deleteEvent = async (payload: DeleteEventDto) => {
    return api.delete<GenericResponse>(`${BASE_URL}`, {data: payload});
};

export const useDeleteEvent = () => {
    return useMutation({
        mutationKey: ['delete-event'],
        mutationFn: async (payload: DeleteEventDto) => deleteEvent(payload)
    });
};
