import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ImageUploadField } from '@/components/image-upload-field';
import { RichTextEditor } from '@/components/rich-text-editor';
import type { Blog } from '../blogs';

type BlogFormData = Omit<Blog, 'id' | 'createdAt'>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BlogFormData) => Promise<void>;
  defaultValues?: Partial<Blog>;
};

export function BlogFormDialog({ open, onOpenChange, onSubmit, defaultValues }: Props) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [published, setPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!defaultValues?.id;

  useEffect(() => {
    if (defaultValues) {
      setTitle(defaultValues.title ?? '');
      setSubtitle(defaultValues.subtitle ?? '');
      setDescription(defaultValues.description ?? '');
      setImage(defaultValues.image ?? '');
      setPublished(defaultValues.published ?? false);
    } else {
      setTitle('');
      setSubtitle('');
      setDescription('');
      setImage('');
      setPublished(false);
    }
  }, [defaultValues, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({ title, subtitle, description, image, published });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[#667467]">
            {isEditing ? 'Modifier le blog' : 'Ajouter un blog'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto flex-1 pr-2">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre du blog"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Sous-titre</Label>
            <Input
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Sous-titre (optionnel)"
            />
          </div>
          <div className="space-y-2">
            <Label>Contenu</Label>
            <RichTextEditor value={description} onChange={setDescription} />
          </div>
          <ImageUploadField
            id="image"
            value={image}
            label="Image"
            category="blogs"
            onChange={setImage}
          />
          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published" className="cursor-pointer">
              Publié
            </Label>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer bg-[#667467] hover:bg-[#667467]/90"
            >
              {isLoading
                ? isEditing
                  ? 'Modification...'
                  : 'Ajout...'
                : isEditing
                  ? 'Modifier'
                  : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
