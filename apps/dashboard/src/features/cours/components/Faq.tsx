import TitleCours from '@/features/cours/components/title-cours.tsx';
import { useStores } from '@/providers/stores-provider.tsx';
import { useEffect, useState } from 'react';

export const Faq = () => {
  const { siteWebStore } = useStores();

  const [fields, setFields] = useState({
    title: ' ',
    description: ''
  });

  useEffect(() => {
    (async () => {
      await siteWebStore.onInit('welcome');
      const sectionDetails = siteWebStore.getDetailsBySection('welcome');

      setFields({
        title: sectionDetails?.details?.title,
        description: sectionDetails?.details?.description
      });
    })();
  }, []);

  return (
    <div
      className={
        'bg-[#caa168] px-5 py-10 font-extralight md:px-24 md:py-10 lg:px-32 lg:py-20'
      }
      id={'faq'}
    >
      <TitleCours title={'Questions fréquentes'} />
      <div
        dangerouslySetInnerHTML={{ __html: fields.description }}
        className={'font-[TT Chocolates] text-lg text-white md:text-2xl'}
      />
    </div>
  );
};
