import React, { useEffect, useState } from 'react';
import { TEventModel } from '@/features/events/types/events.type.ts';
import FormImageField from '@/features/events/components/admin/event-form/form-image-field.tsx';
import FormTextField from '@/features/events/components/admin/event-form/event-form-text-field.tsx';
import EventFormDateFields from '@/features/events/components/admin/event-form/event-form-date-fields.tsx';
import { Box, Dialog } from '@mui/material';
import FormFieldAutocomplete from '@/components/form-field-autocomplete.tsx';
import { useStores } from '@/providers/stores-provider.tsx';
import dayjs from 'dayjs';

type Props = {
  event?: TEventModel;
  onSave: (eventData: TEventModel, isImageChanged: boolean) => void;
  onDelete?: (eventId: string) => void;
};

const EventFormComponent = ({ event, onSave, onDelete }: Props) => {
  const { eventStore } = useStores();
  const [title, setTitle] = useState(event?.title || '');
  const [subtitle, setSubtitle] = useState(event?.subtitle || '');
  const [description, setDescription] = useState(event?.description || '');
  const [image, setImage] = useState<File | string>(event?.image || '');
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [startDate, setStartDate] = useState(
    event?.startDate ? dayjs(event.startDate).format('YYYY-MM-DD') : ''
  );

  const [endDate, setEndDate] = useState(
    event?.endDate ? dayjs(event.endDate).format('YYYY-MM-DD') : ''
  );

  const [startHour, setStartHour] = useState(event?.startHour || '');
  const [endHour, setEndHour] = useState(event?.endHour || '');
  const [linkRegister, setLinkRegister] = useState(event?.linkRegister || '');
  const [location, setLocation] = useState(event?.location || '');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    if (event?.image) {
      setImage(event.image);
    }
  }, [event]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setIsImageChanged(true);
    }
  };

  const handleSubmit = () => {
    if (!title) {
      alert('Veuillez ajouter un titre.');
      return;
    }

    onSave(
      {
        id: event?.id || '',
        title,
        subtitle,
        description,
        image,
        startDate,
        startHour,
        endDate,
        endHour,
        linkRegister,
        location
      },
      isImageChanged
    );
  };

  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    if (event && event.id && onDelete) {
      onDelete(event.id);
    }
    setOpenDeleteModal(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <div className="col-span-2 space-y-4">
        <FormImageField
          image={image}
          onImageChange={handleImageChange}
          category="events"
          name="event-image"
          required
        />

        <FormTextField
          title={title}
          subtitle={subtitle}
          description={description}
          linkRegister={linkRegister}
          onTitleChange={(e) => setTitle(e.target.value)}
          onSubtitleChange={(e) => setSubtitle(e.target.value)}
          onDescriptionChange={(value: string) => setDescription(value)}
          onLinkChange={(e) => setLinkRegister(e.target.value)}
        />
      </div>

      <div className="relative flex flex-col-reverse gap-6 md:flex-col">
        <div className="flex items-center justify-center space-x-4">
          {event && (
            <button
              onClick={handleDeleteClick}
              className="rounded-md border border-red-500 px-4 py-2 text-red-500"
            >
              Supprimer
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="rounded-md bg-blue-800 px-4 py-2 text-white hover:bg-blue-900"
          >
            Enregistrer
          </button>
        </div>

        <FormFieldAutocomplete
          label="Lieu de l'évènement"
          value={location}
          options={eventStore.locations.map((loc) => loc.title)}
          onChange={(val) => setLocation(val)}
          required
        />
        <EventFormDateFields
          startDate={startDate}
          startHour={startHour}
          endDate={endDate}
          endHour={endHour}
          onHourStartChange={(e) => setStartHour(e.target.value)}
          onStartChange={(e) => setStartDate(e.target.value)}
          onHourEndChange={(e) => setEndHour(e.target.value)}
          onEndChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <Dialog open={openDeleteModal} onClose={handleCloseModal}>
        <Box className={'p-10'}>
          <div className={'text-lg font-bold'}>
            Êtes-vous sûr de vouloir supprimer cet événement ?
          </div>
          <div className={'mt-10 flex justify-end gap-x-4'}>
            <button
              className={
                'cursor-pointer rounded-md border border-gray-500 p-2 text-gray-500 hover:bg-gray-100'
              }
              onClick={handleCloseModal}
            >
              Annuler
            </button>
            <button
              className={
                'cursor-pointer rounded-md bg-red-500 p-2 text-white hover:bg-red-600'
              }
              onClick={handleConfirmDelete}
            >
              Supprimer
            </button>
          </div>
        </Box>
      </Dialog>
    </div>
  );
};

export default EventFormComponent;
