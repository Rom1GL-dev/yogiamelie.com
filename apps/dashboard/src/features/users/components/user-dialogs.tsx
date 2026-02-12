import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { useUser } from '@/features/users/context/user-provider';
import { UserFormDialog, type UserFormData } from './user-form-dialog';
import { DeleteDialog } from '../../blogs/components/delete-dialog';

interface Props {
  onSuccess: () => void;
}

export function UserDialogs({ onSuccess }: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = useUser();

  const handleAdd = async (data: UserFormData) => {
    try {
      await api.post('/v1/users', data);
      toast.success('Utilisateur ajouté avec succès.');
      setOpen(null);
      onSuccess();
    } catch {
      toast.error("Erreur lors de l'ajout de l'utilisateur.");
    }
  };

  const handleEdit = async (data: UserFormData) => {
    if (!currentRow) return;
    try {
      await api.put('/v1/users', { ...data, id: currentRow.id });
      toast.success('Utilisateur modifié avec succès.');
      setOpen(null);
      setCurrentRow(null);
      onSuccess();
    } catch {
      toast.error("Erreur lors de la modification de l'utilisateur.");
    }
  };

  const handleDelete = async () => {
    if (!currentRow) return;
    try {
      await api.delete('/v1/users', { data: { id: currentRow.id } });
      toast.success('Utilisateur supprimé avec succès.');
      setOpen(null);
      setCurrentRow(null);
      onSuccess();
    } catch {
      toast.error("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  return (
    <>
      <UserFormDialog
        open={open === 'create'}
        onOpenChange={(isOpen) => {
          if (!isOpen) setOpen(null);
        }}
        onSubmit={handleAdd}
      />

      {currentRow && (
        <UserFormDialog
          open={open === 'edit'}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setOpen(null);
              setCurrentRow(null);
            }
          }}
          onSubmit={handleEdit}
          defaultValues={currentRow}
        />
      )}

      <DeleteDialog
        open={open === 'delete'}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setOpen(null);
            setCurrentRow(null);
          }
        }}
        onConfirm={handleDelete}
        title="Supprimer l'utilisateur"
        description={`Voulez-vous vraiment supprimer "${currentRow?.name || currentRow?.email}" ? Cette action est irréversible.`}
      />
    </>
  );
}
