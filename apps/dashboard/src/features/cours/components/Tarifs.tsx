import { useState } from 'react';
import TitleCours from '@/features/cours/components/title-cours.tsx';
import { Link } from 'react-router-dom';
import { useStores } from '@/providers/stores-provider.tsx';
import { FaInfoCircle } from 'react-icons/fa';

const ApostropheSafe = ({ children }: { children: string }) => {
  return (
    <>
      {children.split("'").map((part, idx, arr) => (
        <span key={idx}>
          {part}
          {idx < arr.length - 1 && (
            <span className="font-sans not-italic">'</span>
          )}
        </span>
      ))}
    </>
  );
};

export const Tarifs = () => {
  const [visibleButton] = useState(false);
  const [visibleText] = useState(false);
  const { priceStore } = useStores();

  const sortedPrices = [...priceStore.prices].sort((a, b) => {
    const priceA = parseFloat(a.price.replace('€', '').trim());
    const priceB = parseFloat(b.price.replace('€', '').trim());
    return priceB - priceA;
  });

  return (
    <div
      id="tarifs"
      className="bg-[#c08562] px-5 py-10 md:px-24 md:py-10 lg:px-32 lg:py-20"
    >
      <TitleCours title="Tarifs" />
      <div className="mt-10 flex flex-wrap justify-center gap-6 md:justify-between">
        {sortedPrices.map((price, index) => (
          <div
            key={index}
            className="pricing-card relative flex w-56 flex-col items-center rounded-[2rem] border-[3px] border-[#b5bda4] bg-[#fff5e6] p-6 pt-10 text-center shadow-lg"
            data-aos="fade-up"
            data-aos-delay={`${index * 300}`}
          >
            {price.info && (
              <div className="group absolute top-4 right-4 cursor-pointer">
                <FaInfoCircle className="text-2xl text-[#caa168] duration-300 hover:scale-120" />
                <div className="absolute top-[-10px] right-7 z-10 w-48 rounded-md border border-[#caa168] bg-white p-2 text-sm text-[#caa168] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {price.info}
                </div>
              </div>
            )}

            <div className="mb-10">
              <p className="text-shadow font-[Calmius] text-4xl text-[#caa168]">
                {price.label}
              </p>
              <p
                className={`text-[#caa168] ${price.extra ? 'text-7xl' : 'text-8xl'} spectral-regular mt-2 font-[Seasons] font-bold`}
              >
                {price.number ? (
                  <ApostropheSafe>{price.number}</ApostropheSafe>
                ) : (
                  price.extra
                )}
              </p>
              {price.extra && (
                <p className="text-shadow mt-2 mb-10 font-[Calmius] text-4xl font-semibold text-[#caa168]">
                  {price.extra}
                </p>
              )}
            </div>

            <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 transform">
              <div className="w-full rounded-2xl border-2 border-[#fff5e6] bg-[#caa168] p-2">
                <p className="spectral-regular text-5xl text-white">
                  <span className="font-[Seasons]">
                    {price.price.replace('€', '')}
                  </span>
                  <span className="font-sans">€</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mt-10 flex justify-center ${visibleButton ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <Link
          to={'https://yogiamelie.fillout.com/t/o64YdH7Zgxus?id='}
          target={'_blank'}
          className="signup-button font-[TT Chocolates] rounded-full border-2 border-[#a9b394] bg-[#d5ddcb] px-12 py-5 text-2xl text-[#CAA168] uppercase"
        >
          Je m&apos;inscris
        </Link>
      </div>

      <p
        className={`mt-6 text-center text-lg font-extralight text-black italic md:text-xl ${visibleText ? 'opacity-100' : 'opacity-0'} transition-opacity duration-900`}
        data-aos="fade-up"
        data-aos-delay="900"
      >
        Les cartes sont <span className="font-semibold">nominatives</span>,
        valables durant toute la période (du 03/02/2025 au 28/07/2025) et non
        remboursables.
      </p>
    </div>
  );
};
