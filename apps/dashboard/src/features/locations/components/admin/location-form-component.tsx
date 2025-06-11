import React, { useEffect, useState } from 'react';
import FormImageField from '@/features/events/components/admin/event-form/form-image-field.tsx';
import { Box, Dialog } from '@mui/material';
import { TLocationModel } from '@/features/locations/types/location.type.ts';
import FormField from '@/components/form-field.tsx';

type Props = {
  location?: TLocationModel;
  onSave: (locationData: TLocationModel, isImageChanged: boolean) => void;
  onDelete?: (locationId: string) => void;
};

const LocationFormComponent = ({ location, onSave, onDelete }: Props) => {
  const [title, setTitle] = useState(location?.title || '');
  const [subtitle, setSubtitle] = useState(location?.subtitle || '');
  const [lieu, setLieu] = useState(location?.lieu || '');
  const [parking, setParking] = useState(location?.parking || '');
  const [planning, setPlanning] = useState(location?.planning || '');
  const [image, setImage] = useState<File | string>(location?.image || '');
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    if (location?.image) {
      setImage(location.image);
    }
  }, [location]);

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
        id: location?.id || '',
        title,
        subtitle,
        lieu,
        parking,
        planning,
        image
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
    if (location && location.id && onDelete) {
      onDelete(location.id);
    }
    setOpenDeleteModal(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <div className="col-span-2 space-y-4">
        <FormImageField
          image={image}
          onImageChange={handleImageChange}
          category="locations"
          name="location-image"
          required
        />

        <FormField
          label="Titre du lieu"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <FormField
          label="Sous titre du lieu"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
        />

        <FormField
          label="Adresse du lieu"
          value={lieu}
          type={'quill'}
          onChange={(value) => setLieu(value)}
        />

        <FormField
          label="Parking du lieu"
          value={parking}
          type={'quill'}
          onChange={(value) => setParking(value)}
        />

        <FormField
          label="Planning du lieu"
          value={planning}
          type={'quill'}
          onChange={(value) => setPlanning(value)}
        />
      </div>

      <div className="relative flex flex-col-reverse gap-6 md:flex-col">
        <div className="flex items-center justify-center space-x-4">
          {location && (
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
      </div>

      <Dialog open={openDeleteModal} onClose={handleCloseModal}>
        <Box className={'p-10'}>
          <div className={'text-lg font-bold'}>
            Êtes-vous sûr de vouloir supprimer ce lieu ?
          </div>
          <div className={'mt-10 flex justify-end gap-x-4'}>
            <button
              className="cursor-pointer rounded-md border border-gray-500 p-2 text-gray-500 hover:bg-gray-100"
              onClick={handleCloseModal}
            >
              Annuler
            </button>
            <button
              className="cursor-pointer rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
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

export default LocationFormComponent;
