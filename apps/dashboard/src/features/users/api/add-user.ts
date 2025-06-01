import { useMutation } from '@tanstack/react-query';
import { api, GenericResponse } from '@/lib/api';

export interface AddUserDto {
  email: string;
  name: string;
  role: string;
  password: string;
}

const BASE_URL = '/v1/users';

const addUser = async (payload: AddUserDto) => {
  return api.post<GenericResponse>(`${BASE_URL}`, payload);
};

export const useAddUser = () => {
  return useMutation({
    mutationKey: ['add-user'],
    mutationFn: async (payload: AddUserDto) => addUser(payload)
  });
};
