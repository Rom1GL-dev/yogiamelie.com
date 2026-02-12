import { lazy } from 'react';

const Users = lazy(() =>
  import('@/features/users/users').then((m) => ({
    default: m.Users,
  }))
);

export function UsersPage() {
  return <Users />;
}
