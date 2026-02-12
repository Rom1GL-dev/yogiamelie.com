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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUploadField } from '@/components/image-upload-field';
import type { Event } from '../events';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
  defaultValues?: Partial<Event>;
};

export function EventFormDialog({ open, onOpenChange, onSubmit, defaultValues }: Props) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startHour, setStartHour] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endHour, setEndHour] = useState('');
  const [linkRegister, setLinkRegister] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!defaultValues?.id;

  useEffect(() => {
    if (defaultValues) {
      setTitle(defaultValues.title ?? '');
      setSubtitle(defaultValues.subtitle ?? '');
      setDescription(defaultValues.description ?? '');
      setImage(defaultValues.image ?? '');
      setStartDate(defaultValues.startDate ? defaultValues.startDate.substring(0, 10) : '');
      setStartHour(defaultValues.startHour ?? '');
      setEndDate(defaultValues.endDate ? defaultValues.endDate.substring(0, 10) : '');
      setEndHour(defaultValues.endHour ?? '');
      setLinkRegister(defaultValues.linkRegister ?? '');
      setLocation(defaultValues.location ?? '');
    } else {
      setTitle(''); setSubtitle(''); setDescription(''); setImage('');
      setStartDate(''); setStartHour(''); setEndDate(''); setEndHour('');
      setLinkRegister(''); setLocation('');
    }
  }, [defaultValues, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({
        title, subtitle, description, image,
        startDate: new Date(startDate), startHour,
        endDate: new Date(endDate), endHour,
        linkRegister: linkRegister || undefined,
        location: location || undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#667467]">
            {isEditing ? "Modifier l'événement" : 'Ajouter un événement'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Sous-titre</Label>
            <Input id="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Sous-titre (optionnel)" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début</Label>
              <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startHour">Heure de début</Label>
              <Input id="startHour" type="time" value={startHour} onChange={(e) => setStartHour(e.target.value)} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin</Label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endHour">Heure de fin</Label>
              <Input id="endHour" type="time" value={endHour} onChange={(e) => setEndHour(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={4} required />
          </div>
          <ImageUploadField
            id="image"
            value={image}
            label="Image"
            category="events"
            onChange={setImage}
          />
          <div className="space-y-2">
            <Label htmlFor="location">Lieu</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Lieu (optionnel)" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkRegister">Lien d'inscription</Label>
            <Input id="linkRegister" value={linkRegister} onChange={(e) => setLinkRegister(e.target.value)} placeholder="URL d'inscription (optionnel)" />
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
