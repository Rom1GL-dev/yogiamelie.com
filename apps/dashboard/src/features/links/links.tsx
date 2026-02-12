import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Links() {
  const [youtube, setYoutube] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [facebook, setFacebook] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    api.get('/v1/links')
      .then((res) => {
        const links = res.data.links;
        if (links && links.length > 0) {
          const link = links[0];
          setYoutube(link.youtube ?? '');
          setInstagram(link.instagram ?? '');
          setTiktok(link.tiktok ?? '');
          setFacebook(link.facebook ?? '');
        }
      })
      .catch(() => toast.error('Erreur lors du chargement des liens.'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.post('/v1/links', {
        youtube: youtube || undefined,
        instagram: instagram || undefined,
        tiktok: tiktok || undefined,
        facebook: facebook || undefined,
      });
      toast.success('Liens mis à jour avec succès.');
    } catch {
      toast.error('Erreur lors de la mise à jour des liens.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="size-8 animate-spin rounded-full border-4 border-[#e8ede9] border-t-[#667467]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#667467]">Liens & Réseaux sociaux</h1>
        <p className="text-muted-foreground">Gérez vos liens vers les réseaux sociaux.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#667467]">Réseaux sociaux</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube</Label>
              <Input
                id="youtube"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="https://youtube.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tiktok">TikTok</Label>
              <Input
                id="tiktok"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
                placeholder="https://tiktok.com/..."
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSaving}
                className="cursor-pointer bg-[#667467] hover:bg-[#667467]/90"
              >
                {isSaving ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
