import React from 'react';
import ReactQuill from 'react-quill-new';

type FormFieldProps =
  | {
      label: string;
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      type?: 'text' | 'email' | 'number' | 'password' | 'date';
      placeholder?: string;
      required?: boolean;
    }
  | {
      label: string;
      value: string;
      onChange: (value: string) => void;
      type: 'quill';
      placeholder?: string;
      required?: boolean;
    };

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  required,
  type = 'text',
  placeholder = ''
}) => {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className={'ml-1 text-red-500'}>*</span>}
      </label>
      {type === 'quill' ? (
        <ReactQuill
          value={value}
          onChange={(value) => onChange(value)}
          className={'mb-14 h-60'}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full rounded-md border border-gray-300 p-2"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormField;
