import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { api } from '@/lib/api';
import { useNavigate, useLocation } from 'react-router-dom';

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get('/v1/auth/me');
      const account = res.data?.data?.account ?? null;
      setUser(account);
    } catch {
      setUser(null);
      if (location.pathname !== '/connexion') {
        navigate('/connexion', { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    await api.post('/v1/auth/login', { email, password });
    const res = await api.get('/v1/auth/me');
    const account = res.data?.data?.account ?? null;
    setUser(account);
  };

  const logout = async () => {
    await api.post('/v1/auth/logout');
    setUser(null);
    navigate('/connexion', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
