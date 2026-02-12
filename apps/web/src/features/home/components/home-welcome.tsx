'use client';
import SectionLayout from '@/components/ux/section-layout';
import { useSiteWebSection } from '@/hooks/use-site-web-section';
import { appConfig } from '@/config/app.config';

export default function HomeWelcome() {
  const { data: fields } = useSiteWebSection('welcome');

  if (!fields?.title) return null;

  return (
    <SectionLayout title={fields.title} background="#fff5e6">
      <div className="grid grid-cols-1 gap-x-10 bg-[#fff5e6] text-lg tracking-[0.1em] text-[#2d3640] lg:grid-cols-2">
        <div
          className="html-content"
          dangerouslySetInnerHTML={{ __html: fields.description ?? '' }}
          data-aos="fade-up"
          data-aos-delay="350"
        />
        <div
          className="flex items-center justify-center"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          {fields.image && (
            <img
              src={`${appConfig.apiUrl}/v1/images/site-web/${fields.image}`}
              title={fields.title}
              alt={fields.title}
              className="mt-10 rounded-4xl object-cover md:mt-0 lg:h-[500px] lg:w-[500px]"
            />
          )}
        </div>
      </div>
    </SectionLayout>
  );
}
