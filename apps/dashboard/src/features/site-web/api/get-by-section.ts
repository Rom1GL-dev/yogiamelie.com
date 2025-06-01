import { api } from '@/lib/api';
import { AuthResponse } from '@/features/auth/types/account';

const BASE_URL = '/v1/site-web';

export const getBySection = async (section: string) => {
  const response = await api.get<AuthResponse>(`${BASE_URL}/${section}`);

  return response.data;
};
