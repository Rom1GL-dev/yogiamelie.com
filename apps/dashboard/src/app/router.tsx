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
import MentionsRoute from '@/app/routes/admin/mentions.tsx';
import { SiteWebRoute } from '@/app/routes/admin/site-web.tsx';
import { UserNewRoute } from '@/app/routes/admin/users/user-new.tsx';
import { UserDetailsRoute } from '@/app/routes/admin/users/user-details.tsx';
import { CoursRoute } from '@/app/routes/app/cours.tsx';
import EventDetailsAppRoute from '@/app/routes/app/event-details.tsx';
import BlogDetailsAppRoute from '@/app/routes/app/blog-details.tsx';

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
      path: APP_ROUTES.admin.mentions.getHref(),
      element: (
        <ProtectedRoute>
          <MentionsRoute />
        </ProtectedRoute>
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
