import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';
import { UpdateUserForm } from '@/features/users/types/update-user.ts';

const BASE_URL = '/v1/users';

const updateUser = async (payload: Partial<UpdateUserForm>) => {
  return api.put<GenericResponse>(`${BASE_URL}`, payload);
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ['update-blog'],
    mutationFn: async (payload: Partial<UpdateUserForm>) => updateUser(payload)
  });
};
