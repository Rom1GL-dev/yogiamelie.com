import { useState } from 'react';
import { Box, Dialog } from '@mui/material';
import FormField from '@/components/form-field.tsx';
import { TPriceModel } from '@/features/prices/types/location.type.ts';

type Props = {
  priceProps?: TPriceModel;
  onSave: (priceData: TPriceModel) => void;
  onDelete?: (locationId: string) => void;
};

const PriceFormComponent = ({ priceProps, onSave, onDelete }: Props) => {
  const [label, setLabel] = useState(priceProps?.label || '');
  const [number, setNumber] = useState(priceProps?.number || '');
  const [extra, setExtra] = useState(priceProps?.extra || '');
  const [price, setPrice] = useState(priceProps?.price || '');
  const [info, setInfo] = useState(priceProps?.info || '');

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleSubmit = () => {
    onSave({
      id: priceProps?.id || '',
      label,
      number,
      extra,
      price,
      info
    });
  };

  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    if (priceProps && priceProps.id && onDelete) {
      onDelete(priceProps.id);
    }
    setOpenDeleteModal(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <div className="col-span-2 space-y-4">
        <FormField
          label="Label du prix"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />

        <FormField
          label="Quantité"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />

        <FormField
          label="Extra"
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
        />

        <FormField
          label="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <FormField
          label="Message d'information"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
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
            Êtes-vous sûr de vouloir supprimer ce prix ?
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

export default PriceFormComponent;
