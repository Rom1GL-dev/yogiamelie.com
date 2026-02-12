'use client';
import { useState } from 'react';
import SectionLayout from '@/components/ux/section-layout';
import { useSiteWebSection } from '@/hooks/use-site-web-section';

export default function HomeNewsletter() {
  const { data: fields } = useSiteWebSection('newsletter');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!fields?.title) return null;

  return (
    <SectionLayout background="#a9b394">
      <div className="text-center text-white">
        <h2 className="mb-4 text-3xl font-semibold">{fields.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: fields.description ?? '' }}
          className="html-content mb-6 text-lg"
        />
        {fields.button && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-5 cursor-pointer rounded-md border border-black bg-[#eed7c1] px-4 py-2 text-black hover:bg-[#e0c1aa]"
          >
            {fields.button}
          </button>
        )}

        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative mx-auto h-[90vh] w-full max-w-3xl overflow-hidden rounded-lg bg-white p-3 shadow-lg max-sm:h-screen max-sm:w-screen max-sm:rounded-none sm:h-[60vh] lg:p-10"
              style={{ outline: 'none' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 z-10 cursor-pointer text-xl text-gray-600 hover:text-black"
              >
                x
              </button>
              <iframe
                src="https://sibforms.com/serve/MUIFAGeT8aYlqZpg1BasCNdzOg3obfYg17Yr8kLS-3baNUtUvSMKpzsLprAiyykhX49gNU749I_xXINp6-yxZVSq-bKzGy_36PSyNrSmkGqu-MOhkjZs0ijxgeNrdOuK-ykzSxX9l0JX7H0hxxsLhRby-6xsd_AKQ-cB8Ih4B8aOWqma68k694hj-nctyuRN1F0c-3aeQf9xXhe8"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                className="h-full w-full"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        )}
      </div>
    </SectionLayout>
  );
}
