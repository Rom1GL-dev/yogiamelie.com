import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';

export interface DeleteUserDto {
  id: string;
}

const BASE_URL = '/v1/users';

const deleteUser = async (payload: DeleteUserDto) => {
  return api.delete<GenericResponse>(`${BASE_URL}`, { data: payload });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async (payload: DeleteUserDto) => deleteUser(payload)
  });
};
