import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { usePrice } from '@/features/prices/context/price-provider';
import { PriceFormDialog } from './price-form-dialog';
import { DeleteDialog } from '@/features/blogs/components/delete-dialog';

interface Props { onSuccess: () => void; }

export function PriceDialogs({ onSuccess }: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = usePrice();

  const handleAdd = async (data: any) => {
    try {
      await api.post('/v1/prices', data);
      toast.success('Tarif ajouté avec succès.');
      setOpen(null); onSuccess();
    } catch { toast.error("Erreur lors de l'ajout du tarif."); }
  };

  const handleEdit = async (data: any) => {
    if (!currentRow) return;
    try {
      await api.put('/v1/prices', { ...data, id: currentRow.id });
      toast.success('Tarif modifié avec succès.');
      setOpen(null); setCurrentRow(null); onSuccess();
    } catch { toast.error('Erreur lors de la modification du tarif.'); }
  };

  const handleDelete = async () => {
    if (!currentRow) return;
    try {
      await api.delete('/v1/prices', { data: { id: currentRow.id } });
      toast.success('Tarif supprimé avec succès.');
      setOpen(null); setCurrentRow(null); onSuccess();
    } catch { toast.error('Erreur lors de la suppression du tarif.'); }
  };

  return (
    <>
      <PriceFormDialog open={open === 'create'} onOpenChange={(isOpen) => { if (!isOpen) setOpen(null); }} onSubmit={handleAdd} />
      {currentRow && (
        <PriceFormDialog open={open === 'edit'} onOpenChange={(isOpen) => { if (!isOpen) { setOpen(null); setCurrentRow(null); } }} onSubmit={handleEdit} defaultValues={currentRow} />
      )}
      <DeleteDialog open={open === 'delete'} onOpenChange={(isOpen) => { if (!isOpen) { setOpen(null); setCurrentRow(null); } }} onConfirm={handleDelete} title="Supprimer le tarif" description={`Voulez-vous vraiment supprimer "${currentRow?.label}" ? Cette action est irréversible.`} />
    </>
  );
}
