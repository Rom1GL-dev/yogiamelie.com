import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import FormField from '@/components/form-field.tsx';
import { useAddDetail } from '@/features/site-web/api/add-detail.ts';
import { useUpdateDetail } from '@/features/site-web/api/update-detail.ts';
import { useStores } from '@/providers/stores-provider.tsx';
import { useToast } from '@/providers/toast-provider.tsx';
import { FieldMap } from '@/types/fields.ts';

const SECTION = 'mentionLegales';

const SiteWebPageCommunMention = observer(() => {
  const { siteWebStore } = useStores();
  const { showToast } = useToast();
  const [fields, setFields] = useState<FieldMap>({
    description: { id: null, value: '' }
  });

  const addDetailMutation = useAddDetail();
  const updateDetailMutation = useUpdateDetail();

  useEffect(() => {
    (async () => {
      await siteWebStore.onInit(SECTION);

      const sectionDetails = siteWebStore.getDetailsBySection(SECTION);

      const mapped = {
        description: {
          id: null,
          value: sectionDetails?.details?.description || ''
        }
      };

      setFields(mapped);
    })();
  }, []);

  const onChangeField = (fieldName: string, newValue: string) => {
    setFields((prev) => ({
      ...prev,
      [fieldName]: {
        id: prev[fieldName]?.id ?? null,
        value: newValue
      }
    }));
  };

  const handleSave = async () => {
    for (const [key, { id, value }] of Object.entries(fields)) {
      if (id) {
        if (typeof value === 'string') {
          await updateDetailMutation.mutateAsync({
            id,
            contentType: key,
            value
          });
        }
      } else {
        if (typeof value === 'string') {
          await addDetailMutation.mutateAsync({
            section: SECTION,
            contentType: key,
            value
          });
        }
      }
    }
    showToast({
      type: 'success',
      message: 'Section "Mentions Légales" mise à jour avec succès !'
    });
    await siteWebStore.onInit(SECTION);
  };

  if (!siteWebStore.loaded) return <div>Chargement...</div>;

  return (
    <>
      <FormField
        label="Description de la section"
        type={'quill'}
        value={fields.description.value as string}
        onChange={(value) => onChangeField('description', value)}
        required
      />
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="cursor-pointer rounded-md bg-blue-800 px-4 py-2 text-white hover:bg-blue-900"
        >
          Enregistrer
        </button>
      </div>
    </>
  );
});

export default SiteWebPageCommunMention;
