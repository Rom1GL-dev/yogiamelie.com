import { useEffect, useState } from 'react';
import FormField from '@/components/form-field.tsx';
import { observer } from 'mobx-react-lite';
import { useAddDetail } from '@/features/site-web/api/add-detail.ts';
import { useUpdateDetail } from '@/features/site-web/api/update-detail.ts';
import { useStores } from '@/providers/stores-provider.tsx';
import { useToast } from '@/providers/toast-provider.tsx';
import { FieldMap } from '@/types/fields.ts';

const SECTION = 'faqCours';

const SiteWebPageCoursFaq = observer(() => {
  const { siteWebStore } = useStores();
  const { showToast } = useToast();

  const addDetailMutation = useAddDetail();
  const updateDetailMutation = useUpdateDetail();

  const [fields, setFields] = useState<FieldMap>({
    title: { id: null, value: '' },
    description: { id: null, value: '' }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      await siteWebStore.onInit(SECTION);
      const sectionDetails = siteWebStore.getDetailsBySection(SECTION);

      setFields({
        title: {
          id: null,
          value: sectionDetails?.details?.title || ''
        },
        description: {
          id: null,
          value: sectionDetails?.details?.description || ''
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
            value: value
          });
        } else {
          await addDetailMutation.mutateAsync({
            section: SECTION,
            contentType: key,
            value: value
          });
        }
      }

      showToast({
        type: 'success',
        message: 'Section "FAQ" mise à jour avec succès !'
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
    <>
      <FormField
        label="Titre de la section"
        value={fields.title.value}
        onChange={(e) => onChangeField('title', e.target.value)}
        required
      />

      <FormField
        label="Description"
        type="quill"
        value={fields.description.value}
        onChange={(val: string) => onChangeField('description', val)}
        required
      />

      <div className="mt-4 flex justify-end">
        <button
          disabled={isSubmitting}
          onClick={handleSave}
          className="cursor-pointer rounded-md bg-blue-800 px-4 py-2 text-white hover:bg-blue-900 disabled:opacity-50"
        >
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </>
  );
});

export default SiteWebPageCoursFaq;
