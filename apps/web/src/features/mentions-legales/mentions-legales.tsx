'use client';

import React from 'react';
import Title from '@/components/ux/title';
import { useSiteWebSection } from '@/hooks/use-site-web-section';

export function MentionsLegales() {
  const { data } = useSiteWebSection('mentionsLegales');
  const content = data?.content ?? '';

  return (
    <div className={'p-10'}>
      <Title title={'Mentions Légales'} />
      <div
        className={'mt-14 flex flex-col items-center'}
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className={'w-full md:w-3/4'}>
          {content ? (
            <div
              className="html-content max-w-none space-y-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[#58684E] [&_h2]:mb-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#58684E] [&_p]:mb-2"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <p className="text-center text-gray-500">Aucune mention légale configurée.</p>
          )}
        </div>
      </div>
    </div>
  );
}
