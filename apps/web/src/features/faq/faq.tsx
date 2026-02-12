'use client';
import { useState } from 'react';
import Title from '@/components/ux/title';
import { useListFaqs } from '@/features/faq/usecases/list-faqs/use-list-faq';

export const Faq = () => {
  const { data: faqs, isLoading } = useListFaqs();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-10 h-32 w-32 animate-pulse rounded-full bg-[#353F34]/10"></div>
        <div
          className="absolute top-40 right-20 h-24 w-24 animate-pulse rounded-full bg-[#667467]/15"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="relative p-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <Title title="Questions fréquentes" />
            <p
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              Retrouvez ici les réponses aux questions les plus courantes. Si
              vous ne trouvez pas ce que vous cherchez, n&apos;hésitez pas à me
              contacter !
            </p>
          </div>

          <div
            className="overflow-hidden rounded-3xl border border-gray-100 bg-white/80 shadow-2xl backdrop-blur-sm"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            {faqs && faqs.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="group"
                    data-aos="fade-up"
                    data-aos-delay={100 + index * 50}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full px-8 py-6 text-left transition-all duration-300 hover:bg-gray-50/50 focus:bg-gray-50/50 focus:outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-1 items-center gap-4">
                          <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#353F34]/10 transition-colors duration-300 group-hover:bg-[#353F34]/20">
                            <div className="h-2 w-2 rounded-full bg-[#353F34]"></div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-balance text-[#353F34] transition-colors duration-300 group-hover:text-[#667467]">
                              {faq.answer}
                            </h3>
                          </div>
                        </div>
                        <div className="ml-4">
                          <svg
                            className={`h-6 w-6 text-[#353F34] transition-transform duration-300 ${
                              openIndex === index ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === index
                          ? 'max-h-96 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-8 pb-6">{faq.response}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <h3 className="mb-2 text-xl font-semibold text-[#353F34]">
                  {isLoading
                    ? 'Chargement des FAQ...'
                    : 'Aucune FAQ disponible pour le moment.'}
                </h3>
                {!isLoading && (
                  <p className="text-gray-600">
                    Les questions fréquentes apparaîtront ici prochainement.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
