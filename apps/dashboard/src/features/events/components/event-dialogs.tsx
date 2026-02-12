import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { useEvent } from '@/features/events/context/event-provider';
import { EventFormDialog } from './event-form-dialog';
import { DeleteDialog } from '@/features/blogs/components/delete-dialog';

interface Props {
  onSuccess: () => void;
}

export function EventDialogs({ onSuccess }: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = useEvent();

  const handleAdd = async (data: any) => {
    try {
      await api.post('/v1/events', data);
      toast.success('Événement ajouté avec succès.');
      setOpen(null);
      onSuccess();
    } catch {
      toast.error("Erreur lors de l'ajout de l'événement.");
    }
  };

  const handleEdit = async (data: any) => {
    if (!currentRow) return;
    try {
      await api.put('/v1/events', { ...data, id: currentRow.id });
      toast.success('Événement modifié avec succès.');
      setOpen(null);
      setCurrentRow(null);
      onSuccess();
    } catch {
      toast.error("Erreur lors de la modification de l'événement.");
    }
  };

  const handleDelete = async () => {
    if (!currentRow) return;
    try {
      await api.delete('/v1/events', { data: { id: currentRow.id } });
      toast.success('Événement supprimé avec succès.');
      setOpen(null);
      setCurrentRow(null);
      onSuccess();
    } catch {
      toast.error("Erreur lors de la suppression de l'événement.");
    }
  };

  return (
    <>
      <EventFormDialog
        open={open === 'create'}
        onOpenChange={(isOpen) => { if (!isOpen) setOpen(null); }}
        onSubmit={handleAdd}
      />
      {currentRow && (
        <EventFormDialog
          open={open === 'edit'}
          onOpenChange={(isOpen) => { if (!isOpen) { setOpen(null); setCurrentRow(null); } }}
          onSubmit={handleEdit}
          defaultValues={currentRow}
        />
      )}
      <DeleteDialog
        open={open === 'delete'}
        onOpenChange={(isOpen) => { if (!isOpen) { setOpen(null); setCurrentRow(null); } }}
        onConfirm={handleDelete}
        title="Supprimer l'événement"
        description={`Voulez-vous vraiment supprimer "${currentRow?.title}" ? Cette action est irréversible.`}
      />
    </>
  );
}
