'use client';
import SectionLayout from '@/components/ux/section-layout';
import { useSiteWebSection } from '@/hooks/use-site-web-section';
import { appConfig } from '@/config/app.config';

export default function HomeWelcome() {
  const { data: fields } = useSiteWebSection('welcome');

  if (!fields?.title) return null;

  return (
    <SectionLayout title={fields.title} background="#fff5e6">
      <div className="grid grid-cols-1 gap-x-10 text-lg tracking-[0.1em] text-[#2d3640] lg:grid-cols-5">
        <div
          className="html-content lg:col-span-3"
          dangerouslySetInnerHTML={{ __html: fields.description ?? '' }}
          data-aos="fade-right"
          data-aos-delay="200"
        />
        <div
          className="flex items-center justify-center lg:col-span-2"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          {fields.image && (
            <div className="relative mt-10 md:mt-0">
              <div className="absolute -inset-4 rounded-[2rem] border-2 border-[#d5ddcb]/50" />
              <img
                src={`${appConfig.apiUrl}/v1/images/site-web/${fields.image}`}
                title={fields.title}
                alt={fields.title}
                className="relative rounded-4xl object-cover shadow-xl lg:h-[500px] lg:w-[500px]"
              />
            </div>
          )}
        </div>
      </div>
    </SectionLayout>
  );
}
