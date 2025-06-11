import LayoutAdmin from '@/components/layout/admin/layout-admin';
import { useNavigate, useParams } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config';
import EventFormComponent from '@/features/events/components/admin/event-form/event-form-component';
import { TEventModel } from '@/features/events/types/events.type';
import { useStores } from '@/providers/stores-provider';
import {
  DeleteEventDto,
  useDeleteEvent
} from '@/features/events/api/remove-event';
import { useUpdateEvent } from '@/features/events/api/update-event';
import { generateImageName, reformatForUrl, renameFile } from '@/lib/utils';
import { useUploadImage } from '@/features/events/api/upload-image';
import { useToast } from '@/providers/toast-provider.tsx';

export default function EventDetailsRoute() {
  const navigation = useNavigate();
  const { slug } = useParams();
  const { eventStore } = useStores();
  const { showToast } = useToast();
  const uploadImageMutation = useUploadImage();
  const deleteEventMutation = useDeleteEvent();
  const updateEventMutation = useUpdateEvent();

  if (!slug) {
    navigation(APP_ROUTES.admin.events.getHref());
    return null;
  }

  const event = eventStore.getEventByTitle(slug);

  const handleSaveEvent = async (
    eventData: TEventModel,
    isImageChanged: boolean
  ) => {
    let imageName = eventData.image;

    if (isImageChanged) {
      imageName = generateImageName(eventData.title, eventData.image as File);
      const renamedImage = renameFile(eventData.image as File, imageName);

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
      id: eventData.id,
      title: eventData.title,
      subtitle: eventData.subtitle,
      description: eventData.description,
      startDate: eventData.startDate,
      startHour: eventData.startHour,
      endDate: eventData.endDate,
      endHour: eventData.endHour,
      image: imageName as string,
      linkRegister: eventData.linkRegister,
      location: eventData.location
    };

    updateEventMutation.mutate(payload, {
      onSuccess: () => {
        eventStore.updateEventById(payload);
        showToast({
          type: 'success',
          message: 'Événement modifié avec succès !'
        });

        navigation(
          APP_ROUTES.admin.events.getHref() +
            '/' +
            reformatForUrl(payload.title) +
            '-' +
            payload.id
        );
      },
      onError: () => {
        showToast({
          type: 'error',
          message:
            "Une erreur est survenue lors de la modification de l'évènement du blog."
        });
      }
    });
  };

  const handleRemoveEvent = (eventId: string) => {
    const payload: DeleteEventDto = {
      id: eventId
    };

    deleteEventMutation.mutate(payload, {
      onSuccess: () => {
        eventStore.removeEventById(eventId);
        showToast({
          type: 'success',
          message: 'Événement supprimé avec succès !'
        });
        navigation(APP_ROUTES.admin.events.getHref());
      },
      onError: () => {
        showToast({
          type: 'error',
          message:
            "Une erreur est survenue lors de la suppression de l'évènement du blog."
        });
      }
    });
  };

  return (
    <LayoutAdmin
      title={"Détail de l'évènement"}
      breadcrumbs={[
        {
          name: 'Évènements',
          href: APP_ROUTES.admin.events.getHref(),
          current: false
        },
        { name: "Détail de l'évènement", href: '', current: true }
      ]}
    >
      <EventFormComponent
        event={event ?? undefined}
        onSave={handleSaveEvent}
        onDelete={handleRemoveEvent}
      />
    </LayoutAdmin>
  );
}
