import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
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
    const [inputValue, setInputValue] = useState(value);
    const [localOptions, setLocalOptions] = useState<Option[]>(options);

    useEffect(() => {
      setLocalOptions(options);
    }, [options]);

    const filteredOptions =
      inputValue && !localOptions.includes(inputValue)
        ? [...localOptions]
        : localOptions;

    const handleChange = (_: any, newValue: string | null) => {
      if (!newValue) return;

      onChange(newValue);
      setInputValue(newValue);
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
              <div className={`$ flex items-center gap-x-2`}>{option}</div>
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
