import { useStores } from '@/providers/stores-provider';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.ts';

export const ProtectedRoute = observer(({ children }: PropsWithChildren) => {
  const {
    authStore: { isConnected }
  } = useStores();

  const navigation = useNavigate();
  if (!isConnected) {
    navigation(APP_ROUTES.admin.login.getHref());
  }

  return children;
});

export const PublicRoutes = observer(({ children }: PropsWithChildren) => {
  return children;
});
