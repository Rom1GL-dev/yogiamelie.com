'use client';
import Link from 'next/link';
import CoursTitle from '@/components/ux/cours-title';
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
    <div className="bg-[#c08562] px-5 py-10 md:px-24 md:py-10 lg:px-32 lg:py-20">
      <CoursTitle title="Tarifs" />
      <div className="mt-10 grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-3 lg:grid-cols-3">
        {sortedPrices.map((price, index) => (
          <div
            key={price.id}
            className="pricing-card relative flex w-full flex-col items-center overflow-hidden rounded-[2rem] border-[3px] border-[#b5bda4] bg-[#fff5e6] p-6 pt-10 text-center shadow-lg"
            data-aos="fade-up"
            data-aos-delay={`${index * 300}`}
          >
            {price.info && (
              <div className="group absolute top-4 right-4 cursor-pointer">
                <svg
                  className="h-6 w-6 text-[#caa168] duration-300 hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="absolute top-[-10px] right-7 z-10 w-48 rounded-md border border-[#caa168] bg-white p-2 text-sm text-[#caa168] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {price.info}
                </div>
              </div>
            )}
            <div className="mb-10">
              <p className="text-shadow font-[Calmius] text-2xl text-[#caa168] sm:text-3xl">
                {price.label}
              </p>
              <p
                className={`text-[#caa168] ${price.extra ? 'text-4xl sm:text-5xl' : 'text-6xl sm:text-7xl'} mt-2 font-[Seasons] font-bold`}
              >
                <SeasonsText>{String(price.number || price.extra)}</SeasonsText>
              </p>
              {price.number && price.extra && (
                <p className="text-shadow mt-2 mb-10 font-[Calmius] text-2xl font-semibold text-[#caa168] sm:text-3xl">
                  {price.extra}
                </p>
              )}
            </div>
            <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 transform">
              <div className="w-full rounded-2xl border-2 border-[#fff5e6] bg-[#caa168] p-2">
                <p className="text-4xl text-white sm:text-5xl">
                  <span className="font-[Seasons]">
                    <SeasonsText>{price.price.replace('€', '')}</SeasonsText>
                  </span>
                  <span className="font-sans">€</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {fields?.buttonText && fields?.buttonLink && (
        <div
          className="mt-10 flex justify-center"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <Link
            href={fields.buttonLink}
            target="_blank"
            className="rounded-full border-2 border-[#a9b394] bg-[#d5ddcb] px-12 py-5 text-2xl text-[#CAA168] uppercase"
          >
            {fields.buttonText}
          </Link>
        </div>
      )}
      {fields?.phrase && (
        <div
          dangerouslySetInnerHTML={{ __html: fields.phrase }}
          className="html-content mt-6 text-center text-lg font-extralight text-black italic md:text-xl"
          data-aos="fade-up"
          data-aos-delay="900"
        />
      )}
    </div>
  );
}
