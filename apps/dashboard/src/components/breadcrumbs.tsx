import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const routeLabels: Record<string, string> = {
  '/': 'Tableau de bord',
  '/blogs': 'Blogs',
  '/faqs': 'FAQs',
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return (
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <span className="text-foreground font-medium">Tableau de bord</span>
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Link to="/" className="hover:text-foreground transition-colors">
        Tableau de bord
      </Link>
      {segments.map((segment, index) => {
        const path = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;
        const label = routeLabels[path] || segment;

        return (
          <span key={path} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5" />
            {isLast ? (
              <span className="text-foreground font-medium">{label}</span>
            ) : (
              <Link to={path} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
