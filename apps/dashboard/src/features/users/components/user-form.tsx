import { useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import FormField from '@/components/form-field.tsx';
import { TUserModel } from '@/features/auth/types/account.ts';
import { Box, Dialog } from '@mui/material';

type UserFormProps = {
  user?: TUserModel;
  onSave: (eventData: TUserModel) => void;
  onDelete?: (userId: string) => void;
};

const UserForm = ({ user, onSave, onDelete }: UserFormProps) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');
  const [role, setRole] = useState(user?.role || '');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleSubmit = () => {
    onSave({
      id: user?.id ?? '',
      name,
      email,
      password,
      role
    });
  };

  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    if (user && user.id && onDelete) {
      onDelete(user.id);
    }
    setOpenDeleteModal(false);
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="col-span-2 space-y-4">
        <FormField
          label="Nom de l'utilisateur"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FormField
          type={'email'}
          label="Email de l'utilisateur"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {
          <FormField
            label="Mot de passe de l'utilisateur"
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        }
        <FormField
          label="Rôle de l'utilisateur"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>

      <div className="relative flex flex-col gap-6">
        <div className="flex items-center justify-center space-x-4">
          {user && (
            <button
              onClick={handleDeleteClick}
              className="rounded-md border border-red-500 px-4 py-2 text-red-500"
            >
              Supprimer
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="rounded-md bg-blue-800 px-4 py-2 text-white hover:bg-blue-900"
          >
            Enregistrer
          </button>
        </div>
      </div>
      <Dialog open={openDeleteModal} onClose={handleCloseModal}>
        <Box className={'p-10'}>
          <div className={'text-lg font-bold'}>
            Êtes-vous sûr de vouloir supprimer cet événement ?
          </div>
          <div className={'mt-10 flex justify-end gap-x-4'}>
            <button
              className={
                'cursor-pointer rounded-md border border-gray-500 p-2 text-gray-500 hover:bg-gray-100'
              }
              onClick={handleCloseModal}
            >
              Annuler
            </button>
            <button
              className={
                'cursor-pointer rounded-md bg-red-500 p-2 text-white hover:bg-red-600'
              }
              onClick={handleConfirmDelete}
            >
              Supprimer
            </button>
          </div>
        </Box>
      </Dialog>
    </div>
  );
};

export default UserForm;
