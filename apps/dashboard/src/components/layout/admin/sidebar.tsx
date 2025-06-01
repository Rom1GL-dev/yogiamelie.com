import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { navigation } from '@/config/navigation.config.ts';
import { useStores } from '@/providers/stores-provider.tsx';
import { APP_ROUTES } from '@/config/routes.config.ts';

export const Sidebar = () => {
  const location = useLocation();
  const { authStore } = useStores();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname.includes(path)
      ? 'bg-slate-100 p-2 border-r-4 border-slate-600'
      : '';
  };

  return (
    <div className="relative flex hidden h-screen w-64 flex-col justify-between border-r border-gray-300 bg-white md:block">
      <div className="flex-grow p-6">
        <h1 className="mb-1 text-center text-3xl font-bold text-slate-600">
          Yogi Amelie
        </h1>
        <h1 className="mb-10 text-center text-base font-light">
          Administration
        </h1>
        <nav className="space-y-4 text-gray-500">
          {navigation.map((item) => {
            if (item.title) {
              return (
                <div
                  key={item.title}
                  className="mt-10 mb-3 text-sm font-bold text-gray-600"
                >
                  {item.title}
                </div>
              );
            }
            return (
              <Link
                key={item.path}
                to={item.path ?? '#'}
                className={`flex items-center text-gray-600 hover:text-gray-800 ${isActive(item.path ?? '')}`}
              >
                {item.icon && <item.icon className="mr-2" />}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div
        className="absolute bottom-0 flex w-full cursor-pointer items-center justify-center space-x-2 bg-gray-100 p-4 text-center text-gray-600"
        onClick={async () => {
          await authStore.logout();
          navigate(APP_ROUTES.admin.login.path);
        }}
      >
        <FaSignOutAlt className="cursor-pointer" title="Déconnexion" />
        <p>Déconnexion</p>
      </div>
    </div>
  );
};
