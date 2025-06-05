import { useStores } from '@/providers/stores-provider.tsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePresentation() {
  const { siteWebStore } = useStores();

  const [fields, setFields] = useState({
    title: ' ',
    button: '',
    buttonLink: ''
  });

  useEffect(() => {
    (async () => {
      await siteWebStore.onInit('presentation');
      const sectionDetails = siteWebStore.getDetailsBySection('presentation');

      setFields({
        title: sectionDetails?.details?.title,
        button: sectionDetails?.details?.button,
        buttonLink: sectionDetails?.details?.buttonLink
      });
    })();
  }, []);

  return (
    <div className={'relative flex h-3/4 w-full items-center justify-center'}>
      <img
        src={'/images/homeAmelie.webp'}
        alt="Home background"
        className={'block h-[50vh] w-full object-cover md:hidden'}
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        className={'hidden h-full w-full object-cover md:block'}
      >
        <source src={'/home-amelie.mp4'} type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo HTML5.
      </video>
      <div
        className={
          'absolute bottom-10 text-center text-white lg:bottom-14 xl:bottom-20'
        }
      >
        <h1
          className={
            'mb-10 font-[Mistrully] text-4xl text-[#d5ddcb] [text-shadow:_0_1px_0_rgb(0_0_0_/_60%)] md:mb-14 lg:mb-20 lg:text-6xl xl:mb-32 xl:text-8xl'
          }
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {fields.title}
        </h1>
        <Link
          to={fields.buttonLink}
          title={fields.button}
          className={
            'text-md cursor-pointer rounded-lg bg-[#d08349] px-12 py-2.5 font-light shadow-md transition hover:bg-[#ab6a39]'
          }
          data-aos="fade-up"
          data-aos-delay="350"
        >
          {fields.button}
        </Link>
      </div>
    </div>
  );
}
