import { useState } from 'react';
import TitleCours from '@/features/cours/components/title-cours.tsx';
import { Link } from 'react-router-dom';

const pricingData = [
  { courses: 15, price: 180 },
  { courses: 10, price: 130 },
  { courses: 5, price: 70 },
  { courses: 1, price: 15, unit: "l'unité" }
];

export const Tarifs = () => {
  const [visibleButton] = useState(false);
  const [visibleText] = useState(false);

  return (
    <div
      id="tarifs"
      className="bg-[#c08562] px-5 py-10 md:px-24 md:py-10 lg:px-32 lg:py-20"
    >
      <TitleCours title="Tarifs" />
      <div className="mt-10 flex flex-wrap justify-center gap-6 md:justify-between">
        {pricingData.map(({ courses, price, unit }, index) => (
          <div
            key={index}
            className="pricing-card relative flex w-56 flex-col items-center rounded-[2rem] border-[3px] border-[#b5bda4] bg-[#fff5e6] p-6 text-center shadow-lg"
            data-aos="fade-up"
            data-aos-delay={`${index * 300}`}
          >
            <div className={'mb-10'}>
              <p className="text-shadow font-[Calmius] text-4xl text-[#caa168]">
                {unit ? 'Cours à' : 'Carte'}
              </p>
              <p
                className={`text-[#caa168] ${unit ? 'text-7xl' : 'text-8xl'} spectral-regular mt-2 font-[Seasons] font-bold`}
              >
                {unit ? unit : courses}
              </p>
              {!unit && (
                <p className="text-shadow mt-2 mb-10 font-[Calmius] text-4xl font-semibold text-[#caa168]">
                  cours
                </p>
              )}
            </div>

            <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 transform">
              <div className="w-full rounded-2xl border-2 border-[#fff5e6] bg-[#caa168] p-2">
                <p className="spectral-regular font-[Seasons] text-5xl text-white">
                  {price}€
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
