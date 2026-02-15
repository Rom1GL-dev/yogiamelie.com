'use client';
import Link from 'next/link';
import { useSiteWebSection } from '@/hooks/use-site-web-section';

export default function HomePresentation() {
  const { data: fields } = useSiteWebSection('presentation');

  return (
    <div className="relative flex h-[70vh] w-full items-end justify-center pb-20 md:h-[85vh] md:items-center md:pb-0">
      <img
        src="/images/homeAmelie.webp"
        alt="Home background"
        className="absolute inset-0 block h-full w-full object-cover md:hidden"
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      >
        <source src="/home-amelie.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo HTML5.
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-[#353F34]/50 via-[#353F34]/10 to-transparent" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center md:gap-12">
        <h1
          className="font-[Mistrully] text-4xl text-[#d5ddcb] drop-shadow-lg md:text-5xl lg:text-6xl xl:text-7xl"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {fields?.title ?? ''}
        </h1>
        {fields?.button && fields?.buttonLink && (
          <Link
            href={fields.buttonLink}
            title={fields.button}
            className="rounded-full border border-white/20 bg-white/15 px-10 py-3 text-sm font-light tracking-wider text-white uppercase backdrop-blur-sm transition-all duration-300 hover:bg-white/25"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            {fields.button}
          </Link>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[bounce_2s_ease-in-out_infinite]">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-light tracking-[0.3em] text-white/60 uppercase">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>
    </div>
  );
}
