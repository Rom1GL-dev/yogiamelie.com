import LayoutAdmin from '@/components/layout/admin/layout-admin';
import { APP_ROUTES } from '@/config/routes.config';
import EventFormComponent from '@/features/events/components/admin/event-form/event-form-component.tsx';
import { TEventModel } from '@/features/events/types/events.type';
import { AddEventDto, useAddEvent } from '@/features/events/api/add-event';
import { useNavigate } from 'react-router-dom';
import { useStores } from '@/providers/stores-provider.tsx';
import { useUploadImage } from '@/features/events/api/upload-image';
import { generateImageName, renameFile } from '@/lib/utils.ts';
import { useToast } from '@/providers/toast-provider.tsx';
import { AxiosError } from '@/types/axios.ts';

export default function EventNewRoute() {
  const addEventMutation = useAddEvent();
  const uploadImageMutation = useUploadImage();
  const navigation = useNavigate();
  const { showToast } = useToast();
  const { eventStore } = useStores();

  const handleSaveEvent = async (eventData: TEventModel) => {
    const imageName = generateImageName(
      eventData.title,
      eventData.image as File
    );

    const renamedImage = renameFile(eventData.image as File, imageName);

    try {
      await uploadImageMutation.mutateAsync({
        file: renamedImage,
        category: 'events'
      });

      const payload: AddEventDto = {
        title: eventData.title,
        subtitle: eventData.subtitle,
        description: eventData.description,
        startDate: eventData.startDate,
        startHour: eventData.startHour,
        endDate: eventData.endDate,
        endHour: eventData.endHour,
        image: imageName,
        linkRegister: eventData.linkRegister,
        location: eventData.location
      };

      addEventMutation.mutate(payload, {
        onSuccess: () => {
          eventStore.addEvent(payload as TEventModel);
          showToast({
            type: 'success',
            message: 'Événement ajouté avec succès !'
          });
          navigation(APP_ROUTES.admin.events.getHref());
        },
        onError: (error: AxiosError) => {
          showToast({
            type: 'error',
            message:
              error.response?.data.message ??
              "Erreur lors de l'ajout de l'évènement."
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
      title={'Nouvel évènement'}
      breadcrumbs={[
        {
          name: 'Évènements',
          href: APP_ROUTES.admin.events.getHref(),
          current: false
        },
        { name: 'Nouvel évènement', href: '', current: true }
      ]}
    >
      <EventFormComponent onSave={handleSaveEvent} />
    </LayoutAdmin>
  );
}
