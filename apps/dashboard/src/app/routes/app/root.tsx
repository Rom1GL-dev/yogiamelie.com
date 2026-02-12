import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loading } from '@/components/loading';

export function AppRoot() {
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
}
