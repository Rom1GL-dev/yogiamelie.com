import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { FaPlusCircle, FaTrash } from 'react-icons/fa';
import { useAddLocation } from '@/features/events/api/add-location.ts';
import { useDeleteLocation } from '@/features/events/api/remove-location.ts';
import { useStores } from '@/providers/stores-provider.tsx';
import { useToast } from '@/providers/toast-provider.tsx';
import { AxiosError } from '@/types/axios.ts';
import { observer } from 'mobx-react-lite';

type Option = string;

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  required?: boolean;
};

const FormFieldAutocomplete = observer(
  ({ label, value, options, onChange, required }: Props) => {
    const { eventStore } = useStores();
    const addLocation = useAddLocation();
    const deleteLocation = useDeleteLocation();
    const { showToast } = useToast();

    const [inputValue, setInputValue] = useState(value);
    const [localOptions, setLocalOptions] = useState<Option[]>(options);

    useEffect(() => {
      setLocalOptions(options);
    }, [options]);

    const isCreating = (option: string) => option.startsWith('Créer "');

    const filteredOptions =
      inputValue && !localOptions.includes(inputValue)
        ? [...localOptions, `Créer "${inputValue}"`]
        : localOptions;

    const handleChange = (_: any, newValue: string | null) => {
      if (!newValue) return;

      if (isCreating(newValue)) {
        const customValue = newValue.replace(/^Créer\s+"|"+$/g, '');

        onChange(customValue);
        setInputValue(customValue);

        addLocation.mutate(
          { title: customValue },
          {
            onSuccess: () => {
              eventStore.addLocation(customValue);
              setLocalOptions((prev) => [...prev, customValue]);
              showToast({
                type: 'success',
                message: 'Lieu ajouté avec succès !'
              });
            },
            onError: (error: AxiosError) => {
              showToast({
                type: 'error',
                message:
                  error.response?.data.message ??
                  "Erreur lors de l'ajout du lieu."
              });
            }
          }
        );
      } else {
        onChange(newValue);
        setInputValue(newValue);
      }
    };

    const handleDelete = (e: React.MouseEvent, option: string) => {
      e.stopPropagation();

      deleteLocation.mutate(
        { title: option },
        {
          onSuccess: () => {
            eventStore.removeLocation(option);
            setLocalOptions((prev) => prev.filter((o) => o !== option));
            showToast({
              type: 'success',
              message: 'Lieu supprimé avec succès !'
            });

            if (value === option) {
              onChange('');
              setInputValue('');
            }
          },
          onError: (error: AxiosError) => {
            showToast({
              type: 'error',
              message:
                error.response?.data.message ??
                'Erreur lors de la suppression du lieu.'
            });
          }
        }
      );
    };

    return (
      <div className="w-full">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        <Autocomplete
          freeSolo
          value={value}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
          onChange={handleChange}
          options={filteredOptions}
          renderOption={(props, option) => (
            <li
              {...props}
              className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 hover:bg-gray-100"
            >
              <div
                className={`flex items-center gap-x-2 ${
                  isCreating(option)
                    ? 'rounded-md bg-gray-100 p-2 text-gray-800'
                    : ''
                }`}
              >
                {isCreating(option) && (
                  <FaPlusCircle className="text-gray-600" />
                )}
                {option}
              </div>
              {!isCreating(option) && (
                <button
                  onClick={(e) => handleDelete(e, option)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              )}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Choisissez ou créez un lieu"
              fullWidth
              size="small"
              className="rounded-md border border-gray-300"
            />
          )}
        />
      </div>
    );
  }
);

export default FormFieldAutocomplete;
