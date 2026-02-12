import Title from '@/components/ux/title';
import { useListFaqs } from '@/features/faq/usecases/list-faqs/use-list-faq';

export const Faq = () => {
  const { data: faqs, isLoading } = useListFaqs();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg text-gray-500">Chargement des FAQ...</p>
      </div>
    );
  }

  return (
    <>
      <Title title="Questions fréquentes" />
      <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8 lg:pb-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <dl className="space-y-6 divide-y divide-gray-900/10">
            {faqs ? (
              faqs.map((faq, index) => (
                <div
                  key={index}
                  className="pt-6"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <dt>
                    <button
                      type="button"
                      className="flex w-full items-start justify-between text-left text-gray-900"
                    >
                      <span className="text-base font-semibold">
                        ● - {faq.answer}
                      </span>
                    </button>
                  </dt>
                  <dd className="mt-2 text-gray-600">{faq.response}</dd>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                Aucune FAQ disponible pour le moment.
              </p>
            )}
          </dl>
        </div>
      </div>
    </>
  );
};
