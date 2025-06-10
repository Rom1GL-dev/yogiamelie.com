import { useState } from 'react';
import { SiteWebPageCommunFooter } from '@/features/site-web/components/commun/site-web-page-commun-footer.tsx';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SiteWebPageCommunMention from '@/features/site-web/components/commun/site-web-page-commun-mention.tsx';

const sections = [
  { id: 'mentionLegales', title: 'Mentions Légales' },
  { id: 'footer', title: 'Pied de Page' }
];

export default function SiteWebPageCommun() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="mx-auto mt-6">
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="rounded-lg border border-gray-200">
            <button
              onClick={() => toggleSection(section.id)}
              className="flex w-full cursor-pointer items-center justify-between rounded-t-lg bg-gray-100 px-4 py-3 text-left font-medium text-gray-800 transition hover:bg-gray-200"
            >
              {section.title}
              <span>
                {openSection === section.id ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </span>
            </button>

            {openSection === section.id && (
              <div className="space-y-4 border-t border-gray-200 bg-white p-4">
                {section.id === 'mentionLegales' && (
                  <SiteWebPageCommunMention />
                )}
                {section.id === 'footer' && <SiteWebPageCommunFooter />}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
