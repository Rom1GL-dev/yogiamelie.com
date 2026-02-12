import { appConfig } from '@/config/app.config';

const handleResponse = async <T>(res: Response) => {
  const resJson = await res.json();
  if (!res.ok) {
    throw new Error(resJson.error || 'Unknown error');
  }
  return (resJson.data ?? resJson) as T;
};

export const createFetcher = (apiUrl: string) => {
  const fetcher = (path: string, init?: RequestInit) =>
    fetch(`${apiUrl}${path}`, init);

  return {
    get: async <T>(path: string, init?: RequestInit): Promise<T> => {
      const res = await fetcher(path, {
        ...init,
        method: 'GET',
        credentials: 'include'
      });
      return handleResponse<T>(res);
    },

    post: async <TResponse, TRequest = unknown>(
      path: string,
      data?: TRequest,
      init?: RequestInit
    ): Promise<TResponse> => {
      const res = await fetcher(path, {
        ...init,
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...init?.headers },
        body: data ? JSON.stringify(data) : undefined
      });
      return handleResponse<TResponse>(res);
    },

    update: async <TResponse, TRequest = unknown>(
      path: string,
      data?: TRequest,
      init?: RequestInit
    ): Promise<TResponse> => {
      const res = await fetcher(path, {
        ...init,
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...init?.headers },
        body: data ? JSON.stringify(data) : undefined
      });
      return handleResponse<TResponse>(res);
    },

    delete: async <TResponse, TRequest = unknown>(
      path: string,
      data?: TRequest,
      init?: RequestInit
    ): Promise<TResponse> => {
      const res = await fetcher(path, {
        ...init,
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...init?.headers },
        body: data ? JSON.stringify(data) : undefined
      });
      return handleResponse<TResponse>(res);
    }
  };
};

export const fetcher = createFetcher(appConfig.apiUrl);
