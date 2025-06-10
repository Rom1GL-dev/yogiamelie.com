import GoBackBanner from '@/components/app/go-back-banner.tsx';
import { useStores } from '@/providers/stores-provider.tsx';
import { useEffect, useState } from 'react';

export default function MentionsLegalesAppRoute() {
  const { siteWebStore } = useStores();

  const [fields, setFields] = useState({
    description: ''
  });

  useEffect(() => {
    (async () => {
      await siteWebStore.onInit('mentionLegales');
      const sectionDetails = siteWebStore.getDetailsBySection('mentionLegales');

      setFields({
        description: sectionDetails?.details?.description
      });
    })();
  }, []);

  return (
    <div className={'min-h-screen w-full bg-[#fff5e6]'}>
      <GoBackBanner />
      <div className={'mt-15 px-4 py-6 md:px-8 lg:px-32'}>
        <div
          dangerouslySetInnerHTML={{ __html: fields.description }}
          className="mb-5 text-base md:text-lg"
        />
      </div>
    </div>
  );
}
