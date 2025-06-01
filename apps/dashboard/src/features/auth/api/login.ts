import { z } from 'zod';
import { api } from '@/lib/api';
import { AuthResponse } from '@/features/auth/types/account.ts';

const BASE_URL = '/v1/auth';

export const LoginInputSchema = z.object({
  email: z.string().email({ message: 'Entrez une adresse email valide' }),
  password: z.string()
});

export type LoginInput = z.infer<typeof LoginInputSchema>;

export const login = async (data: LoginInput) => {
  const res = await api.post<AuthResponse>(`${BASE_URL}/login`, data);
  return res.data;
};
