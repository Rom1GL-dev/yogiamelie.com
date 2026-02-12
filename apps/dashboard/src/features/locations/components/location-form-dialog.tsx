import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ImageUploadField } from '@/components/image-upload-field';
import { RichTextEditor } from '@/components/rich-text-editor';
import type { Location } from '../locations';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
  defaultValues?: Partial<Location>;
};

export function LocationFormDialog({ open, onOpenChange, onSubmit, defaultValues }: Props) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [lieu, setLieu] = useState('');
  const [parking, setParking] = useState('');
  const [planning, setPlanning] = useState('');
  const [image, setImage] = useState('');
  const [published, setPublished] = useState(false);
  const [buttonText, setButtonText] = useState('');
  const [buttonLink, setButtonLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!defaultValues?.id;

  useEffect(() => {
    if (defaultValues) {
      setTitle(defaultValues.title ?? ''); setSubtitle(defaultValues.subtitle ?? '');
      setLieu(defaultValues.lieu ?? ''); setParking(defaultValues.parking ?? '');
      setPlanning(defaultValues.planning ?? ''); setImage(defaultValues.image ?? '');
      setPublished(defaultValues.published ?? false);
      setButtonText(defaultValues.buttonText ?? ''); setButtonLink(defaultValues.buttonLink ?? '');
    } else {
      setTitle(''); setSubtitle(''); setLieu(''); setParking(''); setPlanning('');
      setImage(''); setPublished(false); setButtonText(''); setButtonLink('');
    }
  }, [defaultValues, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({ title, subtitle, lieu, parking, planning, image, published, buttonText, buttonLink });
    } finally { setIsLoading(false); }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#667467]">{isEditing ? 'Modifier le lieu' : 'Ajouter un lieu'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Sous-titre</Label>
            <Input id="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Sous-titre" required />
          </div>
          <div className="space-y-2">
            <Label>Adresse / Lieu</Label>
            <RichTextEditor value={lieu} onChange={setLieu} />
          </div>
          <div className="space-y-2">
            <Label>Parking</Label>
            <RichTextEditor value={parking} onChange={setParking} />
          </div>
          <div className="space-y-2">
            <Label>Planning</Label>
            <RichTextEditor value={planning} onChange={setPlanning} />
          </div>
          <ImageUploadField
            id="location-image"
            value={image}
            label="Image"
            category="locations"
            onChange={setImage}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="buttonText">Texte du bouton</Label>
              <Input id="buttonText" value={buttonText} onChange={(e) => setButtonText(e.target.value)} placeholder="Optionnel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buttonLink">Lien du bouton</Label>
              <Input id="buttonLink" value={buttonLink} onChange={(e) => setButtonLink(e.target.value)} placeholder="Optionnel" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="published" checked={published} onCheckedChange={setPublished} />
            <Label htmlFor="published" className="cursor-pointer">Publié</Label>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">Annuler</Button>
            <Button type="submit" disabled={isLoading} className="cursor-pointer bg-[#667467] hover:bg-[#667467]/90">
              {isLoading ? (isEditing ? 'Modification...' : 'Ajout...') : (isEditing ? 'Modifier' : 'Ajouter')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
