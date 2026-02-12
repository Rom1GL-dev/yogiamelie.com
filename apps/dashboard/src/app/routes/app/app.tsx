import { lazy } from 'react';

const Dashboard = lazy(() =>
  import('@/features/dashboard/dashboard').then((m) => ({
    default: m.Dashboard,
  }))
);

export function AppPage() {
  return <Dashboard />;
}
