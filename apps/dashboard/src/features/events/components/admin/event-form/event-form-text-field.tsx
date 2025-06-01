import React from 'react';
import FormField from '@/components/form-field.tsx';

type Props = {
  title: string;
  subtitle: string;
  description: string;
  linkRegister: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubtitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: any) => void;
  onLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EventTextFields = ({
  title,
  subtitle,
  description,
  linkRegister,
  onTitleChange,
  onSubtitleChange,
  onDescriptionChange,
  onLinkChange
}: Props) => {
  return (
    <>
      <FormField
        label="Titre de l'évènement"
        value={title}
        onChange={onTitleChange}
        required
      />
      <FormField
        label="Sous-titre de l'évènement"
        value={subtitle}
        onChange={onSubtitleChange}
      />
      <FormField
        label="Description de l'évènement"
        type="quill"
        value={description}
        onChange={onDescriptionChange}
        required
      />
      <FormField
        label="Lien d'inscription de l'évènement"
        value={linkRegister}
        onChange={onLinkChange}
      />
    </>
  );
};

export default EventTextFields;
