import { useEffect, useState } from 'react';
import FormField from '@/components/form-field.tsx';
import { observer } from 'mobx-react-lite';
import { useAddDetail } from '@/features/site-web/api/add-detail.ts';
import { useUpdateDetail } from '@/features/site-web/api/update-detail.ts';
import { useStores } from '@/providers/stores-provider.tsx';
import { useToast } from '@/providers/toast-provider.tsx';
import { FieldMap } from '@/types/fields.ts';

const SECTION = 'tarifsCours';

const SiteWebCoursPrix = observer(() => {
  const { siteWebStore } = useStores();
  const { showToast } = useToast();

  const addDetailMutation = useAddDetail();
  const updateDetailMutation = useUpdateDetail();

  const [fields, setFields] = useState<FieldMap>({
    phrase: { id: null, value: '' },
    buttonText: { id: null, value: '' },
    buttonLink: { id: null, value: '' }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      await siteWebStore.onInit(SECTION);
      const sectionDetails = siteWebStore.getDetailsBySection(SECTION);

      setFields({
        phrase: {
          id: null,
          value: sectionDetails?.details?.phrase || ''
        },
        buttonText: {
          id: null,
          value: sectionDetails?.details?.buttonText || ''
        },
        buttonLink: {
          id: null,
          value: sectionDetails?.details?.buttonLink || ''
        }
      });
    })();
  }, []);

  const onChangeField = (fieldName: string, newValue: any) => {
    setFields((prev) => ({
      ...prev,
      [fieldName]: {
        id: prev[fieldName]?.id ?? null,
        value: newValue
      }
    }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    try {
      for (const [key, { id, value }] of Object.entries(fields)) {
        if (id) {
          await updateDetailMutation.mutateAsync({
            id,
            contentType: key,
            value: value as string
          });
        } else {
          await addDetailMutation.mutateAsync({
            section: SECTION,
            contentType: key,
            value: value as string
          });
        }
      }

      showToast({
        type: 'success',
        message: 'Section "Tarifs" mise à jour avec succès !'
      });

      await siteWebStore.onInit(SECTION);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showToast({
        type: 'error',
        message: 'Erreur lors de la sauvegarde de la section.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!siteWebStore.loaded) return <div>Chargement...</div>;

  return (
    <div className={'flex flex-col gap-y-5'}>
      <FormField
        label="Phrases prix"
        type={'quill'}
        value={fields.phrase.value as string}
        onChange={(value) => onChangeField('phrase', value)}
        required
      />

      <FormField
        label="Texte du bouton"
        value={fields.buttonText.value as string}
        onChange={(e) => onChangeField('buttonText', e.target.value)}
        required
      />

      <FormField
        label="Lien du bouton"
        value={fields.buttonLink.value as string}
        onChange={(e) => onChangeField('buttonLink', e.target.value)}
        required
      />

      <button
        disabled={isSubmitting}
        onClick={handleSave}
        className="h-1/2 cursor-pointer rounded-md bg-blue-800 px-4 py-2 text-white hover:bg-blue-900 disabled:opacity-50"
      >
        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </div>
  );
});

export default SiteWebCoursPrix;
