import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { useFaq } from '@/features/faqs/context/faq-provider';
import { FaqFormDialog } from './faq-form-dialog';
import { DeleteDialog } from '../../blogs/components/delete-dialog';

interface Props {
  onSuccess: () => void;
}

export function FaqDialogs({ onSuccess }: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = useFaq();

  const handleAdd = async (data: { answer: string; response: string }) => {
    try {
      await api.post('/v1/faqs', data);
      toast.success('FAQ ajoutée avec succès.');
      setOpen(null);
      onSuccess();
    } catch {
      toast.error("Erreur lors de l'ajout de la FAQ.");
    }
  };

  const handleEdit = async (data: { answer: string; response: string }) => {
    if (!currentRow) return;
    try {
      await api.put('/v1/faqs', { ...data, id: currentRow.id });
      toast.success('FAQ modifiée avec succès.');
      setOpen(null);
      setCurrentRow(null);
      onSuccess();
    } catch {
      toast.error('Erreur lors de la modification de la FAQ.');
    }
  };

  const handleDelete = async () => {
    if (!currentRow) return;
    try {
      await api.delete('/v1/faqs', { data: { id: currentRow.id } });
      toast.success('FAQ supprimée avec succès.');
      setOpen(null);
      setCurrentRow(null);
      onSuccess();
    } catch {
      toast.error('Erreur lors de la suppression de la FAQ.');
    }
  };

  return (
    <>
      <FaqFormDialog
        open={open === 'create'}
        onOpenChange={(isOpen) => {
          if (!isOpen) setOpen(null);
        }}
        onSubmit={handleAdd}
      />

      {currentRow && (
        <FaqFormDialog
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
        title="Supprimer la FAQ"
        description="Voulez-vous vraiment supprimer cette FAQ ? Cette action est irréversible."
      />
    </>
  );
}
