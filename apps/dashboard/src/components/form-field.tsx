import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'number' | 'password' | 'date';
  placeholder?: string;
  required?: boolean;
};

type QuillFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: 'quill';
  placeholder?: string;
  required?: boolean;
};

type FormFieldProps = InputFieldProps | QuillFieldProps;

const FormField: React.FC<FormFieldProps> = (props) => {
  const { label, value, required, placeholder = '' } = props;

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className={'ml-1 text-red-500'}>*</span>}
      </label>

      {'type' in props && props.type === 'quill' ? (
        <ReactQuill
          value={value}
          onChange={props.onChange}
          className={'mb-14 h-60'}
        />
      ) : (
        <input
          type={props.type || 'text'}
          value={value}
          onChange={props.onChange}
          required={required}
          className="w-full rounded-md border border-gray-300 p-2"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormField;
