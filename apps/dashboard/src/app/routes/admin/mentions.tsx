import LayoutAdmin from '@/components/layout/admin/layout-admin.tsx';
import ReactQuill from 'react-quill-new';
import React from 'react';
import { mentions } from '@/config/content.config.ts';

export default function MentionsRoute() {
  const [value, setValue] = React.useState(mentions ?? '');
  const handleSubmit = () => {};

  return (
    <LayoutAdmin
      title={'Mentions légales'}
      description="Mentions légales de l'application"
      breadcrumbs={[{ name: 'Mentions', href: '', current: true }]}
      button={
        <button
          onClick={handleSubmit}
          className="rounded-md bg-blue-800 px-4 py-2 text-white hover:bg-blue-900"
        >
          Enregistrer
        </button>
      }
    >
      <ReactQuill
        value={value}
        onChange={(e) => setValue(e)}
        className={'mb-14 h-[60%]'}
      />
    </LayoutAdmin>
  );
}
