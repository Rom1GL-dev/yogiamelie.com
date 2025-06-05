import TitleCours from '@/features/cours/components/title-cours.tsx';
import { useStores } from '@/providers/stores-provider.tsx';
import { useEffect, useState } from 'react';

export const About = () => {
  const { siteWebStore } = useStores();

  const [fields, setFields] = useState({
    title: ' ',
    description: ''
  });

  useEffect(() => {
    (async () => {
      await siteWebStore.onInit('aboutCours');
      const sectionDetails = siteWebStore.getDetailsBySection('aboutCours');

      setFields({
        title: sectionDetails?.details?.title,
        description: sectionDetails?.details?.description
      });
    })();
  }, []);

  return (
    <div
      id={'a-propos'}
      className="bg-[#c08562] px-5 py-10 md:px-24 md:py-10 lg:px-32 lg:py-20"
    >
      <div data-aos="fade-up" data-aos-delay="300">
        <TitleCours title={fields.title} />
      </div>

      <div
        className="text-shadow text-beige text-justify text-lg leading-relaxed font-extralight text-[#FFF5E6] md:text-2xl"
        dangerouslySetInnerHTML={{ __html: fields.description }}
      />
    </div>
  );
};
