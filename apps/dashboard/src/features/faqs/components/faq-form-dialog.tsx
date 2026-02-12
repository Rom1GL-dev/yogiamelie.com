import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Faq } from '../faqs';

type FaqFormData = { answer: string; response: string };

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FaqFormData) => Promise<void>;
  defaultValues?: Partial<Faq>;
};

export function FaqFormDialog({ open, onOpenChange, onSubmit, defaultValues }: Props) {
  const [answer, setAnswer] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!defaultValues?.id;

  useEffect(() => {
    if (defaultValues) {
      setAnswer(defaultValues.answer ?? '');
      setResponse(defaultValues.response ?? '');
    } else {
      setAnswer('');
      setResponse('');
    }
  }, [defaultValues, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({ answer, response });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#667467]">
            {isEditing ? 'Modifier la FAQ' : 'Ajouter une FAQ'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="answer">Question</Label>
            <Input
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="La question"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="response">Réponse</Label>
            <Textarea
              id="response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="La réponse"
              rows={5}
              required
            />
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
