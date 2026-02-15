'use client';
import Link from 'next/link';
import { usePrices } from '@/hooks/use-prices';
import { useSiteWebSection } from '@/hooks/use-site-web-section';
import { SeasonsText } from '@/components/ux/seasons-text';

export default function CoursTarifs() {
  const { data: prices } = usePrices();
  const { data: fields } = useSiteWebSection('tarifsCours');

  const sortedPrices = [...(prices ?? [])].sort((a, b) => {
    const priceA = parseFloat(a.price.replace('€', '').trim()) || 0;
    const priceB = parseFloat(b.price.replace('€', '').trim()) || 0;
    return priceB - priceA;
  });

  if (sortedPrices.length === 0) return null;

  return (
    <div className="bg-[#faf8f5] px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <h2
          className="mb-10 text-center font-[Mistrully] text-3xl text-[#353F34] md:mb-14 md:text-4xl"
          data-aos="fade-up"
        >
          Tarifs
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPrices.map((price, index) => (
            <div
              key={price.id}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              {price.info && (
                <div className="group/info absolute top-4 right-4 cursor-pointer">
                  <svg className="h-5 w-5 text-[#c08562]/60 transition-colors hover:text-[#c08562]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute top-0 right-7 z-10 w-48 rounded-xl bg-white p-3 text-xs text-[#353F34]/70 opacity-0 shadow-xl ring-1 ring-black/5 transition-opacity duration-200 group-hover/info:opacity-100">
                    {price.info}
                  </div>
                </div>
              )}

              <p className="text-sm font-medium tracking-wide text-[#353F34]/50 uppercase">
                {price.label}
              </p>
              <div className="mt-3 mb-2">
                {price.number && (
                  <p className="font-[Seasons] text-lg text-[#c08562]">
                    <SeasonsText>{String(price.number)}</SeasonsText>
                  </p>
                )}
                {price.extra && (
                  <p className="text-sm text-[#353F34]/50">
                    {price.extra}
                  </p>
                )}
              </div>

              <div className="mt-4 border-t border-[#353F34]/8 pt-4">
                <p className="font-[Seasons] text-4xl text-[#353F34]">
                  <SeasonsText>{price.price.replace('€', '')}</SeasonsText>
                  <span className="font-sans text-lg text-[#353F34]/50">€</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {fields?.buttonText && fields?.buttonLink && (
          <div className="mt-10 flex justify-center" data-aos="fade-up">
            <Link
              href={fields.buttonLink}
              target="_blank"
              className="rounded-full bg-[#353F34] px-10 py-4 text-sm font-medium tracking-wider text-white uppercase transition-all duration-300 hover:bg-[#2a3229] hover:shadow-lg"
            >
              {fields.buttonText}
            </Link>
          </div>
        )}

        {fields?.phrase && (
          <div
            dangerouslySetInnerHTML={{ __html: fields.phrase }}
            className="html-content mt-8 text-center text-base text-[#353F34]/50 italic"
            data-aos="fade-up"
          />
        )}
      </div>
    </div>
  );
}
