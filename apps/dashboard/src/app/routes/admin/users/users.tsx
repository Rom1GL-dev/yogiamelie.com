import LayoutAdmin from '@/components/layout/admin/layout-admin.tsx';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.ts';
import { useStores } from '@/providers/stores-provider.tsx';

export const UsersRoute = () => {
  const { userStore } = useStores();

  return (
    <LayoutAdmin
      title={'Utilisateurs'}
      description={'Liste de tous les utilisateurs ayant accès au panel.'}
      breadcrumbs={[{ name: 'Utilisateurs', href: '', current: true }]}
      button={
        <Link
          to={APP_ROUTES.admin.userNew.getHref()}
          className={
            'cursor-pointer rounded-md border border-2 border-dashed border-slate-600 p-1 text-center text-sm text-slate-600 hover:border-slate-400 hover:bg-slate-200 md:p-2 md:text-left md:text-base'
          }
        >
          Nouvel Utilisateur
        </Link>
      }
    >
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Nom
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Rôle
            </th>
            <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
              <span className="sr-only">Modifier</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {userStore.users.map((person) => (
            <tr key={person.email}>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                {person.name}
              </td>
              <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell">
                {person.email}
              </td>
              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                {person.role}
              </td>
              <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                <Link
                  to={APP_ROUTES.admin.users.path + '/' + person.email}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Modifier<span className="sr-only">, {person.name}</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </LayoutAdmin>
  );
};
