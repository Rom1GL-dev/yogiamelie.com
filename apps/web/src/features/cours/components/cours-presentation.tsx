'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useSiteWebSection } from '@/hooks/use-site-web-section';
import { appConfig } from '@/config/app.config';
import { SeasonsText } from '@/components/ux/seasons-text';

export default function CoursPresentation() {
  const { data: fields } = useSiteWebSection('presentationCours');

  return (
    <div className="flex w-full flex-col items-center border-b-2 border-[#c08562] bg-[#fff5e6] p-5 pt-16 md:p-10 lg:flex-row lg:justify-center">
      <div className="relative w-3/4">
        <div className="relative z-10 flex flex-col items-center">
          <Image src="/images/logo.png" alt="Logo" title="Logo" width={190} height={190} />
          <h1
            className="text-shadow mt-10 text-center font-[Seasons] text-5xl text-[#c08562]"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <SeasonsText>{fields?.title ?? ''}</SeasonsText>
          </h1>
          <h2
            className="text-shadow mt-7 text-center text-xl font-light uppercase tracking-[.15em] text-[#caa168]"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            {fields?.description ?? ''}
          </h2>
          {fields?.button && fields?.buttonLink && (
            <Link
              href={fields.buttonLink}
              target="_blank"
              className="mt-20 rounded-full border-2 border-[#a9b394] bg-[#d5ddcb] px-9 py-3 text-2xl uppercase text-[#caa168]"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {fields.button}
            </Link>
          )}
        </div>
      </div>
      {fields?.image && (
        <div className="z-20 mt-10 flex w-full justify-center lg:mt-0 lg:ml-5">
          <img
            src={`${appConfig.apiUrl}/v1/images/site-web/${fields.image}`}
            alt="Image Cours"
            className="h-[486px] w-full max-w-full rounded-xl object-cover md:h-[586px] lg:h-[686px] lg:max-w-[686px]"
            data-aos="fade-up"
            data-aos-delay="100"
          />
        </div>
      )}
    </div>
  );
}
