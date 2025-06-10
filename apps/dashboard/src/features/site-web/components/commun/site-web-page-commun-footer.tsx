import { observer } from 'mobx-react-lite';
import SocialMediaForm from '@/features/links/components/site-web-form.tsx';
import { useStores } from '@/providers/stores-provider.tsx';
import { useToast } from '@/providers/toast-provider.tsx';
import { useUpdateLinks } from '@/features/links/api/update-links.ts';
import { TLinkModel } from '@/features/links/types/links.type.ts';
import { AxiosError } from '@/types/axios.ts';

export const SiteWebPageCommunFooter = observer(() => {
  const { linkStore } = useStores();
  const { showToast } = useToast();
  const updateLinksMutation = useUpdateLinks();

  const handleSaveLinks = (linksData: TLinkModel) => {
    const payload = {
      youtube: linksData.youtube || undefined,
      facebook: linksData.facebook || undefined,
      instagram: linksData.instagram || undefined
    };

    updateLinksMutation.mutate(payload, {
      onSuccess: () => {
        showToast({
          type: 'success',
          message: 'Section "Pied de page" mise à jour avec succès !'
        });
      },
      onError: (error: AxiosError) => {
        showToast({
          type: 'error',
          message:
            error.response?.data.message ??
            'Erreur lors de la modification des liens.'
        });
      }
    });
  };

  return (
    <SocialMediaForm
      socialMedia={{
        facebook: linkStore.links?.facebook ?? '',
        instagram: linkStore.links?.instagram ?? '',
        youtube: linkStore.links?.youtube ?? ''
      }}
      onSave={handleSaveLinks}
    />
  );
});
