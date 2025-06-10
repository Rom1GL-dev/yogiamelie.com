import { useState } from 'react';
import { SiteWebPageCommunFooter } from '@/features/site-web/components/commun/site-web-page-commun-footer.tsx';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SiteWebPageCoursFaq from '@/features/site-web/components/cours/site-web-page-cours-faq.tsx';
import SiteWebPageCoursMateriels from '@/features/site-web/components/cours/site-web-page-cours-materiels.tsx';
import SiteWebPageCoursPresentation from '@/features/site-web/components/cours/site-web-page-cours-presentation.tsx';
import SiteWebPageCoursBienvenue from '@/features/site-web/components/cours/site-web-page-cours-bienvenue.tsx';

const sections = [
  { id: 'presentationCours', title: 'Section présentation' },
  { id: 'aboutCours', title: 'Section à propos' },
  { id: 'infosCours', title: 'Section informations' },
  { id: 'tarifsCours', title: 'Section tarifications' },
  { id: 'materielsCours', title: 'Section matériels' },
  { id: 'faqCours', title: 'Section FAQ' }
];

export default function SiteWebPageCours() {
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
                {section.id === 'presentationCours' && (
                  <SiteWebPageCoursPresentation />
                )}
                {section.id === 'aboutCours' && <SiteWebPageCoursBienvenue />}
                {section.id === 'faqCours' && <SiteWebPageCoursFaq />}
                {section.id === 'materielsCours' && (
                  <SiteWebPageCoursMateriels />
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
