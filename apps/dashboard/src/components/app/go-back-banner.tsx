import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.ts';
import { ArrowLeft } from 'lucide-react';

export default function GoBackBanner() {
  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between bg-white p-2 px-5 text-[#353F34] lg:p-4 lg:px-11">
      <ul className="items-center justify-end space-x-8 lg:flex">
        <li className="group relative">
          <Link
            className="flex cursor-pointer items-center gap-x-2 text-sm font-bold"
            title={"Revenir sur la page d'accueil"}
            to={APP_ROUTES.app.getHref()}
          >
            <ArrowLeft size={20} /> Revenir sur la page d'accueil
          </Link>
        </li>
      </ul>
    </nav>
  );
}
