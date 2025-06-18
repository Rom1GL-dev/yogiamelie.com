import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoot } from './routes/app/root.tsx';
import { ProtectedRoute, PublicRoutes } from '../lib/auth.tsx';
import { APP_ROUTES } from '../config/routes.config.ts';
import { LoginRoute } from '@/app/routes/admin/login.tsx';
import { EventsRoute } from '@/app/routes/admin/events/events.tsx';
import { DashboardRoute } from '@/app/routes/admin/dashboard.tsx';
import { BlogsRoute } from '@/app/routes/admin/blogs/blogs.tsx';
import { UsersRoute } from '@/app/routes/admin/users/users.tsx';
import EventDetailsRoute from '@/app/routes/admin/events/event-details.tsx';
import EventNewRoute from '@/app/routes/admin/events/event-new.tsx';
import BlogDetailsRoute from '@/app/routes/admin/blogs/blog-details.tsx';
import BlogNewRoute from '@/app/routes/admin/blogs/blog-new.tsx';
import { SiteWebRoute } from '@/app/routes/admin/site-web.tsx';
import { UserNewRoute } from '@/app/routes/admin/users/user-new.tsx';
import { UserDetailsRoute } from '@/app/routes/admin/users/user-details.tsx';
import { CoursRoute } from '@/app/routes/app/cours.tsx';
import EventDetailsAppRoute from '@/app/routes/app/event-details.tsx';
import BlogDetailsAppRoute from '@/app/routes/app/blog-details.tsx';
import MentionsLegalesAppRoute from '@/app/routes/app/mentions-legales.tsx';
import LocationNewRoute from '@/app/routes/admin/locations/location-new.tsx';
import LocationDetailsRoute from '@/app/routes/admin/locations/location-details.tsx';
import LocationsRoute from '@/app/routes/admin/locations/locations.tsx';
import PricesRoute from '@/app/routes/admin/prices/prices.tsx';
import PriceNewRoute from '@/app/routes/admin/prices/price-new.tsx';
import PriceDetailsRoute from '@/app/routes/admin/prices/price-details.tsx';
import { NotFoundRoute } from '@/app/routes/not-found.tsx';

const queryClient = new QueryClient();

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: APP_ROUTES.app.getHref(),
      element: (
        <PublicRoutes>
          <AppRoot />
        </PublicRoutes>
      ),
      children: [
        {
          path: '',
          lazy: async () => {
            const { AppRoute } = await import('./routes/app/app');
            return { Component: AppRoute };
          }
        }
      ]
    },
    {
      path: APP_ROUTES.app.cours.getHref(),
      element: (
        <PublicRoutes>
          <CoursRoute />
        </PublicRoutes>
      )
    },
    {
      path: APP_ROUTES.app.blogDetails.getHref(),
      element: (
        <PublicRoutes>
          <BlogDetailsAppRoute />
        </PublicRoutes>
      )
    },
    {
      path: APP_ROUTES.app.eventsDetails.getHref(),
      element: (
        <PublicRoutes>
          <EventDetailsAppRoute />
        </PublicRoutes>
      )
    },
    {
      path: APP_ROUTES.admin.login.getHref(),
      element: (
        <PublicRoutes>
          <LoginRoute />
        </PublicRoutes>
      )
    },
    {
      path: APP_ROUTES.admin.dashboard.getHref(),
      element: (
        <ProtectedRoute>
          <DashboardRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.blogs.getHref(),
      element: (
        <ProtectedRoute>
          <BlogsRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.blogDetails.getHref(),
      element: (
        <ProtectedRoute>
          <BlogDetailsRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.blogsNew.getHref(),
      element: (
        <ProtectedRoute>
          <BlogNewRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.locations.getHref(),
      element: (
        <ProtectedRoute>
          <LocationsRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.locationDetails.getHref(),
      element: (
        <ProtectedRoute>
          <LocationDetailsRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.locationNew.getHref(),
      element: (
        <ProtectedRoute>
          <LocationNewRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.prices.getHref(),
      element: (
        <ProtectedRoute>
          <PricesRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.priceNew.getHref(),
      element: (
        <ProtectedRoute>
          <PriceNewRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.priceDetails.getHref(),
      element: (
        <ProtectedRoute>
          <PriceDetailsRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.events.getHref(),
      element: (
        <ProtectedRoute>
          <EventsRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.users.getHref(),
      element: (
        <ProtectedRoute>
          <UsersRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.userDetails.getHref(),
      element: (
        <ProtectedRoute>
          <UserDetailsRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.userNew.getHref(),
      element: (
        <ProtectedRoute>
          <UserNewRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.eventsDetails.getHref(),
      element: (
        <ProtectedRoute>
          <EventDetailsRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.eventNew.getHref(),
      element: (
        <ProtectedRoute>
          <EventNewRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.admin.siteWeb.getHref(),
      element: (
        <ProtectedRoute>
          <SiteWebRoute />
        </ProtectedRoute>
      )
    },
    {
      path: APP_ROUTES.app.mentions.getHref(),
      element: (
        <PublicRoutes>
          <MentionsLegalesAppRoute />
        </PublicRoutes>
      )
    },
    {
      path: '*',
      element: (
        <PublicRoutes>
          <NotFoundRoute />
        </PublicRoutes>
      )
    }
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
