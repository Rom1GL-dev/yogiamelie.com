import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Loading } from '@/components/loading';
import { Layout } from '@/components/layout';
import { LoginPage } from '@/app/routes/login/login';
import { AppRoot } from '@/app/routes/app/root';
import { AppPage } from '@/app/routes/app/app';
import { BlogsPage } from '@/app/routes/app/blogs';
import { FaqsPage } from '@/app/routes/app/faqs';
import { EventsPage } from '@/app/routes/app/events';
import { LocationsPage } from '@/app/routes/app/locations';
import { PricesPage } from '@/app/routes/app/prices';
import { LinksPage } from '@/app/routes/app/links';
import { SiteWebPage } from '@/app/routes/app/site-web';
import { UsersPage } from '@/app/routes/app/users';
import { NotFoundPage } from '@/app/routes/not-found';
import { routes } from '@/config/routes.config';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={routes.login} replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to={routes.app} replace />;
  }

  return <>{children}</>;
}

export function AppRouter() {
  return (
    <Routes>
      <Route
        path={routes.login}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route element={<AppRoot />}>
          <Route index element={<AppPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="faqs" element={<FaqsPage />} />
          <Route path="evenements" element={<EventsPage />} />
          <Route path="lieux" element={<LocationsPage />} />
          <Route path="tarifs" element={<PricesPage />} />
          <Route path="liens" element={<LinksPage />} />
          <Route path="site-web" element={<SiteWebPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
