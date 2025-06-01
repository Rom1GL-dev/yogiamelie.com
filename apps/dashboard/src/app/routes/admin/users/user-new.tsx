import LayoutAdmin from '@/components/layout/admin/layout-admin.tsx';
import { APP_ROUTES } from '@/config/routes.config.ts';
import UserForm from '@/features/users/components/user-form.tsx';
import { useAddUser } from '@/features/users/api/add-user.ts';
import { useStores } from '@/providers/stores-provider.tsx';
import { useToast } from '@/providers/toast-provider.tsx';
import { useNavigate } from 'react-router-dom';
import { TUserModel } from '@/features/auth/types/account.ts';
import { AxiosError } from '@/types/axios.ts';

export const UserNewRoute = () => {
  const addUserMutation = useAddUser();
  const { userStore } = useStores();
  const { showToast } = useToast();
  const navigation = useNavigate();

  const handleSaveUser = (userData: TUserModel) => {
    const payload: TUserModel = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role
    };

    addUserMutation.mutate(payload, {
      onSuccess: () => {
        userStore.addUser(payload as TUserModel);
        showToast({
          type: 'success',
          message: 'Utilisateur ajouté avec succès !'
        });
        navigation(APP_ROUTES.admin.users.getHref());
      },
      onError: (error: AxiosError) => {
        showToast({
          type: 'error',
          message:
            error.response?.data.message ?? "Erreur lors de l'ajout du blog."
        });
      }
    });
  };

  return (
    <LayoutAdmin
      title={'Nouvel utilisateur'}
      breadcrumbs={[
        {
          name: 'Utilisateurs',
          href: APP_ROUTES.admin.users.getHref(),
          current: false
        },
        { name: 'Nouvel utilisateur', href: '', current: true }
      ]}
    >
      <UserForm onSave={handleSaveUser} />
    </LayoutAdmin>
  );
};
