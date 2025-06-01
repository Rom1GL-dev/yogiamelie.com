import { api } from '@/lib/api';
import { AuthResponse } from '@/features/auth/types/account';

const BASE_URL = '/v1/events';

export const getAllEvents = async () => {
    const response = await api.get<AuthResponse>(`${BASE_URL}`);

    return response.data;
};