'use client';
import Link from 'next/link';
import { useSiteWebSection } from '@/hooks/use-site-web-section';
import { appConfig } from '@/config/app.config';

export default function CoursMateriel() {
  const { data: fields } = useSiteWebSection('materielsCours');

  if (!fields?.title) return null;

  return (
    <div className="grain bg-[#353F34] px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          {/* Text */}
          <div className="lg:w-1/2">
            <h2 className="mb-6 font-[Mistrully] text-3xl text-[#d5ddcb] md:text-4xl">
              {fields.title}
            </h2>
            <div
              className="html-content text-base leading-[1.8] text-[#d5ddcb]/80 md:text-[17px]"
              dangerouslySetInnerHTML={{ __html: fields.description ?? '' }}
            />
            <div className="mt-8">
              <Link
                href="https://yogiamelie.fillout.com/t/o64YdH7Zgxus?id="
                target="_blank"
                className="inline-block rounded-full bg-[#c08562] px-8 py-3.5 text-sm font-medium tracking-wider text-white uppercase transition-all duration-300 hover:bg-[#b07752]"
              >
                Je m&apos;inscris
              </Link>
            </div>
          </div>

          {/* Images grid */}
          <div className="grid grid-cols-2 gap-3 lg:w-1/2">
            {fields.image1 && (
              <div className="col-span-2">
                <img
                  src={`${appConfig.apiUrl}/v1/images/site-web/${fields.image1}`}
                  alt="Matériel 1"
                  className="h-56 w-full rounded-2xl object-cover shadow-lg md:h-64"
                />
              </div>
            )}
            {fields.image2 && (
              <img
                src={`${appConfig.apiUrl}/v1/images/site-web/${fields.image2}`}
                alt="Matériel 2"
                className="h-40 w-full rounded-2xl object-cover shadow-lg md:h-48"
              />
            )}
            {fields.image3 && (
              <img
                src={`${appConfig.apiUrl}/v1/images/site-web/${fields.image3}`}
                alt="Matériel 3"
                className="h-40 w-full rounded-2xl object-cover shadow-lg md:h-48"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
