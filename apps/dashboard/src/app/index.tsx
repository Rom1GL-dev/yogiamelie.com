import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { AuthProvider } from '@/lib/auth';
import { ToastProvider } from '@/providers/toast-provider';
import { AppRouter } from '@/app/router';

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouter />
          <ToastProvider />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
