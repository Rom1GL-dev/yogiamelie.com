import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { DataTable } from '@/components/data-table/data-table';
import UserProvider from './context/user-provider';
import { userColumns } from './components/user-columns';
import { UserListingToolbar } from './components/user-listing-toolbar';
import { UserDialogs } from './components/user-dialogs';

export type User = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  updatedAt: string | null;
};

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/v1/users');
      setUsers(res.data.users ?? []);
    } catch {
      toast.error('Erreur lors du chargement des utilisateurs.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="size-8 animate-spin rounded-full border-4 border-[#e8ede9] border-t-[#667467]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#667467]">Utilisateurs</h1>
        <p className="text-muted-foreground">
          Gérez les comptes utilisateurs.
        </p>
      </div>

      <UserProvider>
        <DataTable
          columns={userColumns}
          data={users}
          Toolbar={UserListingToolbar}
        />
        <UserDialogs onSuccess={fetchUsers} />
      </UserProvider>
    </div>
  );
}
