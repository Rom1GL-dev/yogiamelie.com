import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { useLocation } from '@/features/locations/context/location-provider';
import { LocationFormDialog } from './location-form-dialog';
import { DeleteDialog } from '@/features/blogs/components/delete-dialog';

interface Props { onSuccess: () => void; }

export function LocationDialogs({ onSuccess }: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = useLocation();

  const handleAdd = async (data: any) => {
    try {
      await api.post('/v1/location', data);
      toast.success('Lieu ajouté avec succès.');
      setOpen(null); onSuccess();
    } catch { toast.error("Erreur lors de l'ajout du lieu."); }
  };

  const handleEdit = async (data: any) => {
    if (!currentRow) return;
    try {
      await api.put('/v1/location', { ...data, id: currentRow.id });
      toast.success('Lieu modifié avec succès.');
      setOpen(null); setCurrentRow(null); onSuccess();
    } catch { toast.error('Erreur lors de la modification du lieu.'); }
  };

  const handleDelete = async () => {
    if (!currentRow) return;
    try {
      await api.delete('/v1/location', { data: { id: currentRow.id } });
      toast.success('Lieu supprimé avec succès.');
      setOpen(null); setCurrentRow(null); onSuccess();
    } catch { toast.error('Erreur lors de la suppression du lieu.'); }
  };

  return (
    <>
      <LocationFormDialog open={open === 'create'} onOpenChange={(isOpen) => { if (!isOpen) setOpen(null); }} onSubmit={handleAdd} />
      {currentRow && (
        <LocationFormDialog open={open === 'edit'} onOpenChange={(isOpen) => { if (!isOpen) { setOpen(null); setCurrentRow(null); } }} onSubmit={handleEdit} defaultValues={currentRow} />
      )}
      <DeleteDialog open={open === 'delete'} onOpenChange={(isOpen) => { if (!isOpen) { setOpen(null); setCurrentRow(null); } }} onConfirm={handleDelete} title="Supprimer le lieu" description={`Voulez-vous vraiment supprimer "${currentRow?.title}" ? Cette action est irréversible.`} />
    </>
  );
}
