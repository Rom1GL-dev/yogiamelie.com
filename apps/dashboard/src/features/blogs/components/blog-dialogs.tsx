import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { useBlog } from '@/features/blogs/context/blog-provider';
import { BlogFormDialog } from './blog-form-dialog';
import { DeleteDialog } from './delete-dialog';

interface Props {
  onSuccess: () => void;
}

export function BlogDialogs({ onSuccess }: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = useBlog();

  const handleAdd = async (data: {
    title: string;
    subtitle: string | null;
    description: string;
    image: string;
    published: boolean;
  }) => {
    try {
      await api.post('/v1/blogs', data);
      toast.success('Blog ajouté avec succès.');
      setOpen(null);
      onSuccess();
    } catch {
      toast.error("Erreur lors de l'ajout du blog.");
    }
  };

  const handleEdit = async (data: {
    title: string;
    subtitle: string | null;
    description: string;
    image: string;
    published: boolean;
  }) => {
    if (!currentRow) return;
    try {
      await api.put('/v1/blogs', { ...data, id: currentRow.id });
      toast.success('Blog modifié avec succès.');
      setOpen(null);
      setCurrentRow(null);
      onSuccess();
    } catch {
      toast.error('Erreur lors de la modification du blog.');
    }
  };

  const handleDelete = async () => {
    if (!currentRow) return;
    try {
      await api.delete('/v1/blogs', { data: { id: currentRow.id } });
      toast.success('Blog supprimé avec succès.');
      setOpen(null);
      setCurrentRow(null);
      onSuccess();
    } catch {
      toast.error('Erreur lors de la suppression du blog.');
    }
  };

  return (
    <>
      <BlogFormDialog
        open={open === 'create'}
        onOpenChange={(isOpen) => {
          if (!isOpen) setOpen(null);
        }}
        onSubmit={handleAdd}
      />

      {currentRow && (
        <BlogFormDialog
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
        title="Supprimer le blog"
        description={`Voulez-vous vraiment supprimer "${currentRow?.title}" ? Cette action est irréversible.`}
      />
    </>
  );
}
