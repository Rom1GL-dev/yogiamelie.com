import React, { useEffect, useState } from 'react';
import FormField from '@/components/form-field.tsx';
import FormImageField from '@/features/events/components/admin/event-form/form-image-field.tsx';
import { observer } from 'mobx-react-lite';
import { useAddDetail } from '@/features/site-web/api/add-detail.ts';
import { useUpdateDetail } from '@/features/site-web/api/update-detail.ts';
import { useStores } from '@/providers/stores-provider.tsx';
import { useToast } from '@/providers/toast-provider.tsx';
import { generateImageName, renameFile } from '@/lib/utils.ts';
import { useUploadImage } from '@/features/events/api/upload-image.ts';
import { FieldMap } from '@/types/fields.ts';

const SECTION = 'welcome';

const SiteWebPagePrincipaleBienvenue = observer(() => {
  const { siteWebStore } = useStores();
  const { showToast } = useToast();

  const addDetailMutation = useAddDetail();
  const updateDetailMutation = useUpdateDetail();
  const uploadImageMutation = useUploadImage();

  const [fields, setFields] = useState<FieldMap>({
    title: { id: null, value: '' },
    description: { id: null, value: '' },
    image: { id: null, value: '' }
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
        },
        image: {
          id: null,
          value: sectionDetails?.details?.image || ''
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
      let imageValue = fields.image.value;

      if (imageValue instanceof File) {
        const imageName = generateImageName(
          fields.title.value as string,
          imageValue
        );
        const renamedFile = renameFile(imageValue, imageName);

        await uploadImageMutation.mutateAsync({
          file: renamedFile,
          category: 'site-web'
        });

        imageValue = imageName;
      }

      for (const [key, { id, value }] of Object.entries(fields)) {
        const valToSave = key === 'image' ? imageValue : value;

        if (id) {
          await updateDetailMutation.mutateAsync({
            id,
            contentType: key,
            value: valToSave as string
          });
        } else {
          await addDetailMutation.mutateAsync({
            section: SECTION,
            contentType: key,
            value: valToSave as string
          });
        }
      }

      showToast({
        type: 'success',
        message: 'Section "Bienvenue" mise à jour avec succès !'
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
        value={fields.title.value as string}
        onChange={(e) => onChangeField('title', e.target.value)}
        required
      />

      <FormField
        label="Description"
        type="quill"
        value={fields.description.value as string}
        onChange={(val: string) => onChangeField('description', val)}
        required
      />

      <FormImageField
        image={fields.image.value}
        onImageChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            onChangeField('image', e.target.files[0]);
          }
        }}
        category="site-web"
        name="site-web-bienvenue-image"
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

export default SiteWebPagePrincipaleBienvenue;
