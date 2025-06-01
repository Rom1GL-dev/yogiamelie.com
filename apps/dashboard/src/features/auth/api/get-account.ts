import { api } from '@/lib/api';
import { AuthResponse } from '@/features/auth/types/account';

const BASE_URL = '/v1/auth';

export const getAccount = async () => {
    const response = await api.get<AuthResponse>(`${BASE_URL}/me`);

    return response.data;
};