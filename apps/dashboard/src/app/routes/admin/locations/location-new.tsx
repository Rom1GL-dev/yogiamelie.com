import { APP_ROUTES } from '@/config/routes.config.ts';
import LayoutAdmin from '@/components/layout/admin/layout-admin.tsx';
import LocationFormComponent from '@/features/locations/components/admin/location-form-component.tsx';
import { AxiosError } from '@/types/axios.ts';
import { useNavigate } from 'react-router-dom';
import { useUploadImage } from '@/features/blogs/api/upload-image.ts';
import { useToast } from '@/providers/toast-provider.tsx';
import { useStores } from '@/providers/stores-provider.tsx';
import { generateImageName, renameFile } from '@/lib/utils.ts';
import {
  AddLocationDto,
  useAddLocation
} from '@/features/locations/api/add-location.tsx';
import { TLocationModel } from '@/features/locations/types/location.type.ts';

export default function LocationNewRoute() {
  const addLocationMutation = useAddLocation();
  const uploadImageMutation = useUploadImage();
  const navigation = useNavigate();
  const { showToast } = useToast();
  const { locationStore } = useStores();

  const handleSaveEvent = async (locationData: AddLocationDto) => {
    const imageName = generateImageName(
      locationData.title,
      locationData.image as File
    );

    const renamedImage = renameFile(locationData.image as File, imageName);

    try {
      await uploadImageMutation.mutateAsync({
        file: renamedImage,
        category: 'locations'
      });

      const payload: AddLocationDto = {
        title: locationData.title,
        subtitle: locationData.subtitle,
        lieu: locationData.lieu,
        parking: locationData.parking,
        planning: locationData.planning,
        published: locationData.published,
        buttonText: locationData.buttonText,
        buttonLink: locationData.buttonLink,

        image: imageName
      };

      addLocationMutation.mutate(payload, {
        onSuccess: () => {
          locationStore.addLocation(payload as TLocationModel);
          showToast({
            type: 'success',
            message: 'Lieu ajouté avec succès !'
          });
          navigation(APP_ROUTES.admin.locations.getHref());
        },
        onError: (error: AxiosError) => {
          showToast({
            type: 'error',
            message:
              error.response?.data.message ?? "Erreur lors de l'ajout du lieu."
          });
        }
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: "Erreur lors de l'upload de l'image." + error
      });
    }
  };

  return (
    <LayoutAdmin
      title={'Nouveau lieu'}
      breadcrumbs={[
        {
          name: 'Lieux',
          href: APP_ROUTES.admin.locations.getHref(),
          current: false
        },
        { name: 'Nouveau lieu', href: '', current: true }
      ]}
    >
      <LocationFormComponent onSave={handleSaveEvent} />
    </LayoutAdmin>
  );
}
