import LayoutAdmin from '@/components/layout/admin/layout-admin.tsx';
import { APP_ROUTES } from '@/config/routes.config.ts';
import UserForm from '@/features/users/components/user-form.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useStores } from '@/providers/stores-provider.tsx';
import { useToast } from '@/providers/toast-provider.tsx';
import { useUpdateUser } from '@/features/users/api/update-user.ts';
import {
  DeleteUserDto,
  useDeleteUser
} from '@/features/users/api/remove-user.ts';
import { AxiosError } from '@/types/axios.ts';
import { TUserModel } from '@/features/auth/types/account.ts';

export const UserDetailsRoute = () => {
  const navigation = useNavigate();
  const { slug } = useParams();
  const { userStore } = useStores();
  const { showToast } = useToast();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  if (!slug) {
    navigation(APP_ROUTES.admin.users.getHref());
    return null;
  }

  const user = userStore.getUserByEmail(slug);

  const handleSaveUser = (userData: TUserModel) => {
    const payload = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      password: userData.password,
      role: userData.role
    };

    updateUserMutation.mutate(payload, {
      onSuccess: () => {
        userStore.updateUserByEmail(payload);
        showToast({
          type: 'success',
          message: "L'utilisateur a été modifié avec succès !"
        });
        navigation(APP_ROUTES.admin.users.getHref() + '/' + payload.email);
      },
      onError: (error: AxiosError) => {
        showToast({
          type: 'error',
          message:
            error.response?.data.message ??
            "Erreur lors de la modification de l'utilisateur."
        });
      }
    });
  };

  const handleRemoveEvent = (userId: string) => {
    const payload: DeleteUserDto = {
      id: userId
    };

    deleteUserMutation.mutate(payload, {
      onSuccess: () => {
        userStore.removeUserById(userId);
        showToast({
          type: 'success',
          message: "L'utilisateur a été supprimé avec succès !"
        });
        navigation(APP_ROUTES.admin.users.getHref());
      },
      onError: (error: AxiosError) => {
        showToast({
          type: 'error',
          message:
            error.response?.data.message ??
            "Erreur lors de la suppression de l'utilisateur."
        });
      }
    });
  };
  return (
    <LayoutAdmin
      title={"Détails de l'utilisateur"}
      breadcrumbs={[
        {
          name: 'Utilisateurs',
          href: APP_ROUTES.admin.users.getHref(),
          current: false
        },
        { name: "Détails de l'utilisateur", href: '', current: true }
      ]}
    >
      <UserForm
        user={user}
        onSave={handleSaveUser}
        onDelete={handleRemoveEvent}
      />
    </LayoutAdmin>
  );
};
