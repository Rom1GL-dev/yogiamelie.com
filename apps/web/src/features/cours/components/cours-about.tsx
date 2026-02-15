'use client';
import { useSiteWebSection } from '@/hooks/use-site-web-section';

export default function CoursAbout() {
  const { data: fields } = useSiteWebSection('aboutCours');

  if (!fields?.title) return null;

  return (
    <div className="bg-[#faf8f5] px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <h2
          className="mb-8 font-[Mistrully] text-3xl text-[#353F34] md:text-4xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {fields.title}
        </h2>
        <div
          className="html-content text-base leading-[1.8] text-[#2d3640] md:text-[17px]"
          dangerouslySetInnerHTML={{ __html: fields.description ?? '' }}
          data-aos="fade-up"
          data-aos-delay="200"
        />
      </div>
    </div>
  );
}
