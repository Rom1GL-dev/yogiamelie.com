'use client';
import CoursTitle from '@/components/ux/cours-title';
import { useSiteWebSection } from '@/hooks/use-site-web-section';

export default function CoursFaq() {
  const { data: fields } = useSiteWebSection('faqCours');

  if (!fields?.description) return null;

  return (
    <div className="bg-[#d5ddcb] px-5 py-10 font-extralight md:px-24 md:py-10 lg:px-32 lg:py-20">
      <CoursTitle title="Questions fréquentes" />
      <div
        dangerouslySetInnerHTML={{ __html: fields.description }}
        className="html-content text-justify text-xl font-extralight leading-relaxed tracking-[.15em] text-[#c08562]"
      />
    </div>
  );
}
