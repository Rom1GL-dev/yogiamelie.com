import { Link } from 'react-router-dom';
import { routes } from '@/config/routes.config';

export function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-[#667467]">404</h1>
      <p className="text-muted-foreground">Page non trouvée</p>
      <Link
        to={routes.app}
        className="rounded-md bg-[#667467] px-4 py-2 text-sm text-white hover:bg-[#667467]/90"
      >
        Retour au tableau de bord
      </Link>
    </div>
  );
}
