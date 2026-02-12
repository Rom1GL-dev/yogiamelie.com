'use client';
import { SeasonsText } from '@/components/ux/seasons-text';

export default function CoursTitle({ title, brun }: { title: string; brun?: boolean }) {
  return (
    <h2
      className={`text-shadow mb-10 font-[Seasons] text-3xl font-light ${brun ? 'text-[#c08562]' : 'text-white'} md:mb-18 md:text-4xl lg:text-5xl`}
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <SeasonsText>{title}</SeasonsText>
    </h2>
  );
}
