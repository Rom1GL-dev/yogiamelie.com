import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
        title: sectionDetails?.details?.title || ' ',
        description: sectionDetails?.details?.description || ' ',
        button: sectionDetails?.details?.button || '',
        buttonLink: sectionDetails?.details?.buttonLink || '',
        image: sectionDetails?.details?.image || ''
      });
    })();
  }, [siteWebStore]);

  return (
    <>
      <Helmet>
        <link rel="preload" href="/images/tache.webp" as="image" />
        <link rel="preload" href="/images/logo.png" as="image" />
        {fields.image && (
          <link
            rel="preload"
            href={`${apiUrl}/v1/images/site-web/${fields.image}`}
            as="image"
          />
        )}
      </Helmet>

      <div
        id={'home'}
        className="flex w-full flex-col items-center border-b-2 border-[#c08562] bg-[#fff5e6] p-5 md:p-10 lg:flex-row lg:justify-center"
      >
        <div className="relative w-3/4">
          <img
            src="/images/tache.webp"
            alt="Décor"
            loading="lazy"
            style={{ width: '900px', height: 'auto' }}
            className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
          />

          <div className="relative z-10 flex flex-col items-center">
            <img
              src="/images/logo.png"
              alt="Logo"
              title="Logo"
              width={190}
              height={190}
              loading="lazy"
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
            {fields.buttonLink && (
              <Link
                to={fields.buttonLink}
                target="_blank"
                className="font-[TT Chocolates] mt-20 rounded-full border-2 border-[#a9b394] bg-[#d5ddcb] px-9 py-3 text-2xl text-[#caa168] uppercase"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                {fields.button}
              </Link>
            )}
          </div>
        </div>

        <div className="font-[TT Chocolates] z-20 mt-10 flex w-full justify-center lg:mt-0 lg:ml-5">
          {fields.image && (
            <img
              src={`${apiUrl}/v1/images/site-web/${fields.image}`}
              alt="Image Home"
              title="Image Home"
              loading="lazy"
              className="h-[486px] w-full max-w-full rounded-xl object-cover md:h-[586px] lg:h-[686px] lg:max-w-[686px]"
              data-aos="fade-up"
              data-aos-delay="100"
            />
          )}
        </div>
      </div>
    </>
  );
};
