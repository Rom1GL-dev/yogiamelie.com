import { useEffect, useState } from 'react';
import LayoutApp from '@/components/layout/app/layout-app.tsx';
import { Modal } from '@mui/material';
import { useStores } from '@/providers/stores-provider.tsx';

export default function Newsletter() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const { siteWebStore } = useStores();

  const [fields, setFields] = useState({
    title: ' ',
    description: '',
    button: ''
  });

  useEffect(() => {
    (async () => {
      await siteWebStore.onInit('newsletter');
      const sectionDetails = siteWebStore.getDetailsBySection('newsletter');

      setFields({
        title: sectionDetails?.details?.title,
        description: sectionDetails?.details?.description,
        button: sectionDetails?.details?.button
      });
    })();
  }, []);

  return (
    <LayoutApp background={'#a9b394'}>
      <div className="text-center text-white">
        <h2 className="mb-4 text-3xl font-semibold">{fields.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: fields.description }}
          className="mb-6 text-lg"
        />
        <button
          onClick={handleOpen}
          className="mt-5 cursor-pointer rounded-md border border-black bg-[#eed7c1] px-4 py-2 text-black hover:bg-[#e0c1aa]"
        >
          {fields.button}
        </button>

        <Modal open={isModalOpen} onClose={handleClose}>
          <div
            className="relative z-10 mx-auto my-10 h-[90vh] w-full max-w-3xl overflow-hidden overflow-y-hidden rounded-lg bg-white p-3 shadow-lg max-sm:my-0 max-sm:h-screen max-sm:w-screen max-sm:rounded-none sm:my-10 sm:h-[60vh] lg:p-10"
            style={{ outline: 'none' }}
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 z-10 cursor-pointer text-xl text-gray-600 hover:text-black"
            >
              ×
            </button>
            <iframe
              src="https://sibforms.com/serve/MUIFAGeT8aYlqZpg1BasCNdzOg3obfYg17Yr8kLS-3baNUtUvSMKpzsLprAiyykhX49gNU749I_xXINp6-yxZVSq-bKzGy_36PSyNrSmkGqu-MOhkjZs0ijxgeNrdOuK-ykzSxX9l0JX7H0hxxsLhRby-6xsd_AKQ-cB8Ih4B8aOWqma68k694hj-nctyuRN1F0c-3aeQf9xXhe8"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              className="h-full w-full"
              style={{ border: 'none' }}
            ></iframe>
          </div>
        </Modal>
      </div>
    </LayoutApp>
  );
}
