'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useSiteWebSection } from '@/hooks/use-site-web-section';
import { appConfig } from '@/config/app.config';
import { SeasonsText } from '@/components/ux/seasons-text';

export default function CoursPresentation() {
  const { data: fields } = useSiteWebSection('presentationCours');

  return (
    <div className="grain relative w-full overflow-hidden bg-[#353F34] px-6 pt-24 pb-16 md:px-10 md:pt-28 md:pb-20 lg:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Text */}
        <div className="flex flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
          <Image src="/images/logo.png" alt="Logo" title="Logo" width={140} height={140} className="mb-8 opacity-90" />
          <h1
            className="font-[Seasons] text-4xl text-[#d5ddcb] md:text-5xl lg:text-6xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <SeasonsText>{fields?.title ?? ''}</SeasonsText>
          </h1>
          <h2
            className="mt-5 text-lg font-light tracking-[.12em] text-[#d5ddcb]/60 uppercase md:text-xl"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {fields?.description ?? ''}
          </h2>
          {fields?.button && fields?.buttonLink && (
            <Link
              href={fields.buttonLink}
              target="_blank"
              className="mt-10 rounded-full bg-[#c08562] px-8 py-3.5 text-sm font-medium tracking-wider text-white uppercase transition-all duration-300 hover:bg-[#b07752] hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {fields.button}
            </Link>
          )}
        </div>

        {/* Image */}
        {fields?.image && (
          <div
            className="lg:w-1/2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src={`${appConfig.apiUrl}/v1/images/site-web/${fields.image}`}
              alt="Image Cours"
              className="w-full rounded-2xl object-cover shadow-2xl shadow-black/30 lg:max-h-[600px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
