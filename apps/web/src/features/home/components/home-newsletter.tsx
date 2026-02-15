'use client';
import { useState } from 'react';
import { useSiteWebSection } from '@/hooks/use-site-web-section';

export default function HomeNewsletter() {
  const { data: fields } = useSiteWebSection('newsletter');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!fields?.title) return null;

  return (
    <div id="newsletter" className="grain relative overflow-hidden bg-[#353F34] px-6 py-12 md:px-14 lg:px-32 lg:py-16">
      <div className="absolute top-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full bg-[#a9b394]/20 blur-3xl" />
      <div className="absolute right-[-80px] bottom-[-80px] h-[250px] w-[250px] rounded-full bg-[#c08562]/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="mb-4 font-[Mistrully] text-2xl text-[#d5ddcb] md:text-3xl">{fields.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: fields.description ?? '' }}
          className="html-content mb-6 text-base text-[#d5ddcb]/80 md:text-lg"
        />

        {fields.button && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-5 cursor-pointer rounded-full bg-[#d08349]/80 px-8 py-3 text-white transition-all duration-300 hover:scale-105 hover:bg-[#d08349]"
          >
            {fields.button}
          </button>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative mx-4 h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white/95 shadow-2xl backdrop-blur-md sm:h-[65vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#353F34]/10 text-[#353F34] transition-colors hover:bg-[#353F34]/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src="https://sibforms.com/serve/MUIFAGeT8aYlqZpg1BasCNdzOg3obfYg17Yr8kLS-3baNUtUvSMKpzsLprAiyykhX49gNU749I_xXINp6-yxZVSq-bKzGy_36PSyNrSmkGqu-MOhkjZs0ijxgeNrdOuK-ykzSxX9l0JX7H0hxxsLhRby-6xsd_AKQ-cB8Ih4B8aOWqma68k694hj-nctyuRN1F0c-3aeQf9xXhe8"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="auto"
              allowFullScreen
              className="h-full w-full"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
