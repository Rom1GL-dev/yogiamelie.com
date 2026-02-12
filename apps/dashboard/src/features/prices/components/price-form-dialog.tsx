import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { Price } from '../prices';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
  defaultValues?: Partial<Price>;
};

export function PriceFormDialog({ open, onOpenChange, onSubmit, defaultValues }: Props) {
  const [label, setLabel] = useState('');
  const [number, setNumber] = useState('');
  const [extra, setExtra] = useState('');
  const [price, setPrice] = useState('');
  const [info, setInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!defaultValues?.id;

  useEffect(() => {
    if (defaultValues) {
      setLabel(defaultValues.label ?? ''); setNumber(defaultValues.number ?? '');
      setExtra(defaultValues.extra ?? ''); setPrice(defaultValues.price ?? '');
      setInfo(defaultValues.info ?? '');
    } else {
      setLabel(''); setNumber(''); setExtra(''); setPrice(''); setInfo('');
    }
  }, [defaultValues, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({ label, number, extra: extra || undefined, price, info: info || undefined });
    } finally { setIsLoading(false); }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#667467]">{isEditing ? 'Modifier le tarif' : 'Ajouter un tarif'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">Libellé</Label>
            <Input id="label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Ex: Cours collectif" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Nombre</Label>
              <Input id="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Ex: 10 séances" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Prix</Label>
              <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ex: 120€" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="extra">Extra</Label>
            <Input id="extra" value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="Information supplémentaire (optionnel)" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="info">Info</Label>
            <Input id="info" value={info} onChange={(e) => setInfo(e.target.value)} placeholder="Message d'info (optionnel)" />
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
