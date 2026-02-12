import { api } from '@/lib/api';

export type LoginPayload = {
  email: string;
  password: string;
};

export const loginUsecase = async (data: LoginPayload) => {
  const response = await api.post('/v1/auth/login', data);
  return response.data;
};
