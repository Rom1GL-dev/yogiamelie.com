import { useState } from 'react';
import SiteWebPagePrincipalePresentation from '@/features/site-web/components/principale/site-web-page-principale-presentation.tsx';
import SiteWebPagePrincipaleBienvenue from '@/features/site-web/components/principale/site-web-page-principale-bienvenue.tsx';
import { SiteWebPagePrincipaleFooter } from '@/features/site-web/components/principale/site-web-page-principale-footer.tsx';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const sections = [
  { id: 'presentation', title: 'Section présentation' },
  { id: 'bienvenue', title: 'Bienvenue dans mon univers' },
  { id: 'footer', title: 'Pied de Page' }
];

export default function SiteWebPagePrincipale() {
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
                {section.id === 'presentation' && (
                  <SiteWebPagePrincipalePresentation />
                )}
                {section.id === 'bienvenue' && (
                  <SiteWebPagePrincipaleBienvenue />
                )}

                {section.id === 'footer' && <SiteWebPagePrincipaleFooter />}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
