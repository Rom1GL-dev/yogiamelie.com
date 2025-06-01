import { Link } from 'react-router-dom';
import TitleCours from '@/features/cours/components/title-cours.tsx';
import { useStores } from '@/providers/stores-provider.tsx';
import { useEffect, useState } from 'react';
import { apiUrl } from '@/config/content.config.ts';

export const Materiel = () => {
  const { siteWebStore } = useStores();

  const [fields, setFields] = useState({
    title: ' ',
    description: '',
    image1: '',
    image2: '',
    image3: ''
  });

  useEffect(() => {
    (async () => {
      await siteWebStore.onInit('materielsCours');
      const sectionDetails = siteWebStore.getDetailsBySection('materielsCours');

      setFields({
        title: sectionDetails?.details?.title,
        description: sectionDetails?.details?.description,
        image1: sectionDetails?.details?.image1,
        image2: sectionDetails?.details?.image2,
        image3: sectionDetails?.details?.image3
      });
    })();
  }, []);

  return (
    <div
      id={'materiel'}
      className={'bg-[#a9b394] px-5 py-10 md:px-24 md:py-10 lg:px-32 lg:py-20'}
    >
      <div
        className={
          'flex flex-col tracking-[.15em] lg:flex-row lg:justify-center'
        }
      >
        <div className={'w-full lg:w-3/5'}>
          <TitleCours title={fields.title} />
          <div
            className={'text-justify text-xl font-extralight text-white'}
            dangerouslySetInnerHTML={{ __html: fields.description }}
          />
          <div className={'mt-7 mb-5 flex justify-center md:mb-0'}>
            <Link
              to={'https://yogiamelie.fillout.com/t/o64YdH7Zgxus?id='}
              target={'_blank'}
              className="signup-button font-[TT Chocolates] rounded-full border-2 border-[#a9b394] bg-[#d5ddcb] px-12 py-5 text-2xl text-[#CAA168] uppercase"
            >
              Je m&apos;inscris
            </Link>
          </div>
        </div>

        <div className="flex h-full w-full flex-col lg:ml-5 lg:w-3/5 lg:flex-row">
          <div className="h-auto w-full lg:w-2/3">
            <img
              src={`${apiUrl}/v1/images/site-web/${fields.image1}`}
              alt="Matériel 1"
              width={500}
              height={600}
              className="rounded-xl object-cover"
            />
          </div>

          <div className="flex w-full flex-col md:ml-5 lg:w-1/3">
            <img
              src={`${apiUrl}/v1/images/site-web/${fields.image2}`}
              alt="Matériel 2"
              width={500}
              height={300}
              className="mb-5 rounded-xl object-cover"
            />
            <img
              src={`${apiUrl}/v1/images/site-web/${fields.image3}`}
              alt="Matériel 3"
              width={500}
              height={200}
              className="rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
