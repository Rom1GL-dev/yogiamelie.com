'use client';
import Link from 'next/link';
import CoursTitle from '@/components/ux/cours-title';
import { useSiteWebSection } from '@/hooks/use-site-web-section';
import { appConfig } from '@/config/app.config';

export default function CoursMateriel() {
  const { data: fields } = useSiteWebSection('materielsCours');

  if (!fields?.title) return null;

  return (
    <div className="bg-[#fff5e6] px-5 py-10 md:px-24 md:py-10 lg:px-32 lg:py-20">
      <div className="flex flex-col tracking-[.15em] lg:flex-row lg:justify-center">
        <div className="w-full lg:w-3/5">
          <CoursTitle title={fields.title} brun />
          <div
            className="html-content text-justify text-xl font-extralight text-[#c08562]"
            dangerouslySetInnerHTML={{ __html: fields.description ?? '' }}
          />
          <div className="mt-7 mb-5 flex justify-center md:mb-0">
            <Link
              href="https://yogiamelie.fillout.com/t/o64YdH7Zgxus?id="
              target="_blank"
              className="rounded-full border-2 border-[#a9b394] bg-[#d5ddcb] px-12 py-5 text-2xl uppercase text-[#CAA168]"
            >
              Je m&apos;inscris
            </Link>
          </div>
        </div>
        <div className="flex h-full w-full flex-col lg:ml-5 lg:w-3/5 lg:flex-row">
          {fields.image1 && (
            <div className="h-auto w-full lg:w-2/3">
              <img src={`${appConfig.apiUrl}/v1/images/site-web/${fields.image1}`} alt="Matériel 1" className="rounded-xl object-cover" />
            </div>
          )}
          <div className="flex w-full flex-col md:ml-5 lg:w-1/3">
            {fields.image2 && <img src={`${appConfig.apiUrl}/v1/images/site-web/${fields.image2}`} alt="Matériel 2" className="mb-5 rounded-xl object-cover" />}
            {fields.image3 && <img src={`${appConfig.apiUrl}/v1/images/site-web/${fields.image3}`} alt="Matériel 3" className="rounded-xl object-cover" />}
          </div>
        </div>
      </div>
    </div>
  );
}
