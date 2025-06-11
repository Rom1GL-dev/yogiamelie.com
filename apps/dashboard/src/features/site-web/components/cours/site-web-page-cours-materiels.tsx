import React, { useEffect, useState } from 'react';
import FormField from '@/components/form-field.tsx';
import FormImageField from '@/features/events/components/admin/event-form/form-image-field.tsx';
import { observer } from 'mobx-react-lite';
import { useAddDetail } from '@/features/site-web/api/add-detail.ts';
import { useUpdateDetail } from '@/features/site-web/api/update-detail.ts';
import { useStores } from '@/providers/stores-provider.tsx';
import { useToast } from '@/providers/toast-provider.tsx';
import { useUploadImage } from '@/features/events/api/upload-image.ts';
import { generateImageName, renameFile } from '@/lib/utils.ts';
import { FieldMap } from '@/types/fields.ts';

const SECTION = 'materielsCours';

const SiteWebPageCoursMateriels = observer(() => {
  const { siteWebStore } = useStores();
  const { showToast } = useToast();

  const addDetailMutation = useAddDetail();
  const updateDetailMutation = useUpdateDetail();
  const uploadImageMutation = useUploadImage();

  const [fields, setFields] = useState<FieldMap>({
    title: { id: null, value: '' },
    description: { id: null, value: '' },
    image1: { id: null, value: '' },
    image2: { id: null, value: '' },
    image3: { id: null, value: '' }
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
        image1: {
          id: null,
          value: sectionDetails?.details?.image1 || ''
        },
        image2: {
          id: null,
          value: sectionDetails?.details?.image2 || ''
        },
        image3: {
          id: null,
          value: sectionDetails?.details?.image3 || ''
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

  const uploadIfFile = async (value: any, title: string): Promise<string> => {
    if (value instanceof File) {
      const imageName = generateImageName(title, value);
      const renamedFile = renameFile(value, imageName);

      await uploadImageMutation.mutateAsync({
        file: renamedFile,
        category: 'site-web'
      });

      return imageName;
    }

    return value;
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    try {
      const image1Value = await uploadIfFile(
        fields.image1.value,
        fields.title.value as string
      );
      const image2Value = await uploadIfFile(
        fields.image2.value,
        fields.title.value as string
      );
      const image3Value = await uploadIfFile(
        fields.image3.value,
        fields.title.value as string
      );

      for (const [key, { id, value }] of Object.entries(fields)) {
        let valToSave = value;

        if (key === 'image1') valToSave = image1Value;
        if (key === 'image2') valToSave = image2Value;
        if (key === 'image3') valToSave = image3Value;

        if (id) {
          await updateDetailMutation.mutateAsync({
            id,
            contentType: key,
            value: valToSave
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

      <div className={'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'}>
        <FormImageField
          image={fields.image1.value}
          onImageChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
              onChangeField('image1', e.target.files[0]);
            }
          }}
          category="site-web"
          name={'image1'}
          required
        />
        <FormImageField
          image={fields.image2.value}
          onImageChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
              onChangeField('image2', e.target.files[0]);
            }
          }}
          category="site-web"
          name={'image2'}
          required
        />
        <FormImageField
          image={fields.image3.value}
          onImageChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
              onChangeField('image3', e.target.files[0]);
            }
          }}
          category="site-web"
          name={'image3'}
          required
        />
      </div>

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

export default SiteWebPageCoursMateriels;
