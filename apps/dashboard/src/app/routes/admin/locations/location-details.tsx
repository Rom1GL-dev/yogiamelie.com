import { APP_ROUTES } from '@/config/routes.config.ts';
import LayoutAdmin from '@/components/layout/admin/layout-admin.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useStores } from '@/providers/stores-provider.tsx';
import { useToast } from '@/providers/toast-provider.tsx';
import { useUploadImage } from '@/features/events/api/upload-image.ts';
import { generateImageName, reformatForUrl, renameFile } from '@/lib/utils.ts';
import LocationFormComponent from '@/features/locations/components/admin/location-form-component.tsx';
import {
  DeleteLocationDto,
  useDeleteLocation
} from '@/features/locations/api/remove-location.tsx';
import { useUpdateLocation } from '@/features/locations/api/update-location.ts';
import { TLocationModel } from '@/features/locations/types/location.type.ts';

export default function LocationDetailsRoute() {
  const navigation = useNavigate();
  const { slug } = useParams();
  const { locationStore } = useStores();
  const { showToast } = useToast();
  const uploadImageMutation = useUploadImage();
  const deleteLocationMutation = useDeleteLocation();
  const updateEventMutation = useUpdateLocation();

  if (!slug) {
    navigation(APP_ROUTES.admin.locations.getHref());
    return null;
  }

  const location = locationStore.getLocationByTitle(slug);

  const handleSaveLocation = async (
    locationData: TLocationModel,
    isImageChanged: boolean
  ) => {
    let imageName = locationData.image;
    if (isImageChanged) {
      imageName = generateImageName(
        locationData.title,
        locationData.image as File
      );
      const renamedImage = renameFile(locationData.image as File, imageName);

      try {
        await uploadImageMutation.mutateAsync({
          file: renamedImage,
          category: 'events'
        });
      } catch (error) {
        console.error("Erreur lors de l'upload de l'image:", error);
        alert("Erreur lors de l'upload de l'image.");
        return;
      }
    }

    const payload = {
      id: locationData.id,
      title: locationData.title,
      subtitle: locationData.subtitle,
      lieu: locationData.lieu,
      parking: locationData.parking,
      planning: locationData.planning,
      image: imageName as string
    };

    updateEventMutation.mutate(payload, {
      onSuccess: () => {
        locationStore.updateLocationById(payload);
        showToast({
          type: 'success',
          message: 'Lieu modifié avec succès !'
        });

        navigation(
          APP_ROUTES.admin.locations.getHref() +
            '/' +
            reformatForUrl(payload.title)
        );
      },
      onError: () => {
        showToast({
          type: 'error',
          message:
            "Une erreur est survenue lors de la modification de l'évènement du lieu."
        });
      }
    });
  };

  const handleRemoveLocation = (eventId: string) => {
    const payload: DeleteLocationDto = {
      id: eventId
    };

    deleteLocationMutation.mutate(payload, {
      onSuccess: () => {
        locationStore.removeLocationById(eventId);
        showToast({
          type: 'success',
          message: 'Lieu supprimé avec succès !'
        });
        navigation(APP_ROUTES.admin.locations.getHref());
      },
      onError: () => {
        showToast({
          type: 'error',
          message:
            "Une erreur est survenue lors de la suppression de l'évènement du lieu."
        });
      }
    });
  };

  return (
    <LayoutAdmin
      title={'Détail du lieu'}
      breadcrumbs={[
        {
          name: 'Lieux',
          href: APP_ROUTES.admin.locations.getHref(),
          current: false
        },
        { name: 'Détail du lieu', href: '', current: true }
      ]}
    >
      <LocationFormComponent
        onSave={handleSaveLocation}
        location={location}
        onDelete={handleRemoveLocation}
      />
    </LayoutAdmin>
  );
}
