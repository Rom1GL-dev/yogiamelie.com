import { Link } from 'react-router-dom';
import { useStores } from '@/providers/stores-provider.tsx';
import { useEffect, useState } from 'react';
import { apiUrl } from '@/config/content.config.ts';

export const HomeCours = () => {
  const { siteWebStore } = useStores();

  const [fields, setFields] = useState({
    title: ' ',
    description: ' ',
    button: '',
    buttonLink: '',
    image: ''
  });

  useEffect(() => {
    (async () => {
      await siteWebStore.onInit('presentationCours');
      const sectionDetails =
        siteWebStore.getDetailsBySection('presentationCours');

      setFields({
        title: sectionDetails?.details?.title,
        description: sectionDetails?.details?.description,
        button: sectionDetails?.details?.button,
        buttonLink: sectionDetails?.details?.buttonLink,
        image: sectionDetails?.details?.image
      });
    })();
  }, []);

  return (
    <div
      id={'home'}
      className="flex w-full flex-col items-center bg-[#fff5e6] p-5 md:p-10 lg:flex-row lg:justify-center"
    >
      <div className="relative w-3/4">
        <img
          src="/images/tache.webp"
          alt="Décor"
          style={{
            width: '900px',
            minWidth: '900px',
            maxWidth: '900px'
          }}
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 z-10 -translate-x-1/2 -translate-y-1/2"
        />

        <div className="relative z-10 flex flex-col items-center">
          <img
            src={'/images/logo.png'}
            alt={'Logo'}
            title={'Logo'}
            width={190}
            height={190}
          />
          <h1
            className="text-shadow mt-10 text-center font-[Seasons] text-5xl text-[#c08562]"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {fields.title}
          </h1>
          <h2
            className="font-[Calmius Sans] text-shadow mt-7 text-center text-xl font-light tracking-[.15em] text-[#caa168] uppercase"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            {fields.description}
          </h2>
          <Link
            to={fields.buttonLink}
            target={'_blank'}
            className="font-[TT Chocolates] mt-20 rounded-full border-2 border-[#a9b394] bg-[#d5ddcb] px-9 py-3 text-2xl text-[#caa168] uppercase"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {fields.button}
          </Link>
        </div>
      </div>

      <div className="font-[TT Chocolates] z-20 mt-10 flex w-full justify-center lg:mt-0 lg:ml-5">
        <img
          src={`${apiUrl}/v1/images/site-web/${fields.image}`}
          alt="Image Home"
          title="Image Home"
          className="h-[486px] w-full max-w-full rounded-xl object-cover md:h-[586px] lg:h-[686px] lg:max-w-[686px]"
          data-aos="fade-up"
          data-aos-delay="100"
        />
      </div>
    </div>
  );
};
