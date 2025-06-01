import { useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import FormField from '@/components/form-field.tsx';

type SocialMediaFormProps = {
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  onSave: (socialMediaData: {
    facebook: string;
    instagram: string;
    youtube: string;
  }) => void;
  onDelete?: (id: string) => void;
};

const SocialMediaForm = ({ socialMedia, onSave }: SocialMediaFormProps) => {
  const [facebook, setFacebook] = useState(socialMedia?.facebook || '');
  const [instagram, setInstagram] = useState(socialMedia?.instagram || '');
  const [youtube, setYoutube] = useState(socialMedia?.youtube || '');

  const handleSubmit = () => {
    onSave({
      facebook,
      instagram,
      youtube
    });
  };

  return (
    <div className="space-y-4">
      <FormField
        label="Facebook"
        value={facebook}
        onChange={(e) => setFacebook(e.target.value)}
      />
      <FormField
        label="Instagram"
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
      />
      <FormField
        label="YouTube"
        value={youtube}
        onChange={(e) => setYoutube(e.target.value)}
      />

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="rounded-md bg-blue-800 px-4 py-2 text-white hover:bg-blue-900"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default SocialMediaForm;
