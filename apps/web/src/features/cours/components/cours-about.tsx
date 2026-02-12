'use client';
import CoursTitle from '@/components/ux/cours-title';
import { useSiteWebSection } from '@/hooks/use-site-web-section';

export default function CoursAbout() {
  const { data: fields } = useSiteWebSection('aboutCours');

  if (!fields?.title) return null;

  return (
    <div className="bg-[#c08562] px-5 py-10 md:px-24 md:py-10 lg:px-32 lg:py-20">
      <div data-aos="fade-up" data-aos-delay="300">
        <CoursTitle title={fields.title} />
      </div>
      <div
        className="html-content text-shadow text-justify text-lg font-extralight leading-relaxed text-[#FFF5E6] md:text-xl"
        dangerouslySetInnerHTML={{ __html: fields.description ?? '' }}
      />
    </div>
  );
}
