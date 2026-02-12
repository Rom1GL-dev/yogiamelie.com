import { api } from '@/lib/api';

export const logoutUsecase = async () => {
  const response = await api.post('/v1/auth/logout');
  return response.data;
};
