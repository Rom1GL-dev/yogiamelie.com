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
      await siteWebStore.onInit('faqCours');
      const sectionDetails = siteWebStore.getDetailsBySection('faqCours');

      setFields({
        title: sectionDetails?.details?.title,
        description: sectionDetails?.details?.description
      });
    })();
  }, []);

  return (
    <div
      className={
        'bg-[#d5ddcb] px-5 py-10 font-extralight md:px-24 md:py-10 lg:px-32 lg:py-20'
      }
      id={'faq'}
    >
      <TitleCours title={'Questions fréquentes'} />
      <div
        dangerouslySetInnerHTML={{ __html: fields.description }}
        className={'font-[TT Chocolates] text-lg text-[#c08562] md:text-2xl'}
      />
    </div>
  );
};
