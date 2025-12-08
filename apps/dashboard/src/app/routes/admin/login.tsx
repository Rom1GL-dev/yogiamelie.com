import { useState } from 'react';
import { useStores } from '@/providers/stores-provider.tsx';
import { LoginInput } from '@/features/auth/api/login.ts';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.ts';

export const LoginRoute = () => {
  const { authStore } = useStores();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    if (!validateEmail(email)) {
      setError("L'adresse email n'est pas valide.");
      return;
    }

    const data: LoginInput = { email, password };

    try {
      await authStore.login(data.email, data.password);
      navigate(APP_ROUTES.admin.dashboard.path);
    } catch (error: any) {
      setError('Adresse email ou mot de passe incorrect.');
    }
  };

  return (
    <div className="min flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-semibold text-slate-600">
          Kesharini Yoga
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Site web d'administration
        </p>
        {error && (
          <div className="mb-4 rounded bg-red-100 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Adresse email :
            </label>
            <input
              type="email"
              placeholder="Entrez votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-slate-500 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium">
              Mot de passe :
            </label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-slate-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer rounded bg-slate-600 px-4 py-2 font-semibold text-white hover:bg-slate-700"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};
