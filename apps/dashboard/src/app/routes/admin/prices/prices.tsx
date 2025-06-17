import { APP_ROUTES } from '@/config/routes.config.ts';
import { Link } from 'react-router-dom';
import LayoutAdmin from '@/components/layout/admin/layout-admin.tsx';
import { useStores } from '@/providers/stores-provider.tsx';

export default function PricesRoute() {
  const { priceStore } = useStores();
  return (
    <LayoutAdmin
      title="Prix"
      description={'Liste des prix.'}
      breadcrumbs={[
        {
          name: 'Prix',
          href: APP_ROUTES.admin.prices.getHref(),
          current: true
        }
      ]}
      button={
        <Link
          to={APP_ROUTES.admin.priceNew.getHref()}
          className={
            'cursor-pointer rounded-md border border-2 border-dashed border-slate-600 p-1 text-center text-sm text-slate-600 hover:border-slate-400 hover:bg-slate-200 md:p-2 md:text-left md:text-base'
          }
        >
          Nouveau prix
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
              Label
            </th>
            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Extra
            </th>
            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Prix
            </th>
            <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
              <span className="sr-only">Modifier</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {priceStore.prices.map((price) => (
            <tr key={price.id}>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                {price.label}
              </td>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                {price.number}
              </td>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                {price.extra}
              </td>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                {price.price}
              </td>
              <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                <Link
                  to={APP_ROUTES.admin.prices.path + '/' + price.id}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Modifier<span className="sr-only">, {price.id}</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </LayoutAdmin>
  );
}
