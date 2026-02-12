'use client';
import { useState, useEffect, useRef } from 'react';
import CoursTitle from '@/components/ux/cours-title';
import { useLocations, type Location } from '@/hooks/use-locations';
import { appConfig } from '@/config/app.config';
import { SeasonsText } from '@/components/ux/seasons-text';
import Link from 'next/link';

function InfosCard({ location }: { location: Location }) {
  return (
    <div
      className="pricing-card relative h-96 w-full max-w-[18rem] cursor-pointer flex-col items-center rounded-[2rem] shadow-lg transition-all duration-300 hover:scale-[1.01] sm:max-w-[20rem] md:max-w-[22rem] lg:w-72"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <div className="absolute flex h-full w-full items-center justify-center">
        <div className="rounded-lg bg-[#a9b394] px-4 py-6 text-center font-[Seasons] text-xl text-white opacity-80 sm:text-2xl md:text-3xl lg:text-4xl">
          <SeasonsText>{location.title}</SeasonsText>
        </div>
      </div>
      <img
        src={`${appConfig.apiUrl}/v1/images/locations/${location.image}`}
        alt={location.title}
        className="h-full w-full rounded-[2rem] object-cover"
      />
    </div>
  );
}

function isValidContent(content: string) {
  return content.trim() !== '' && content.trim() !== '<p><br></p>';
}

function LocationDetail({ location }: { location: Location }) {
  return (
    <div className="font-[TT Chocolates] flex flex-col items-center justify-between tracking-[.1em] lg:flex-row">
      <div>
        {isValidContent(location.lieu ?? '') && (
          <div className="mb-10 flex" data-aos="fade-up" data-aos-delay="300">
            <div className="h-8 w-8">
              <img src="/images/location.png" alt="Location" width={30} height={30} className="mt-1.5" />
            </div>
            <div className="html-content ml-7 text-base text-white md:text-lg lg:text-xl" dangerouslySetInnerHTML={{ __html: location.lieu }} />
          </div>
        )}
        {isValidContent(location.parking ?? '') && (
          <div className="mb-10 flex" data-aos="fade-up" data-aos-delay="600">
            <div className="h-8 w-8">
              <img src="/images/parking.png" alt="Parking" width={40} height={40} className="mt-1.5" />
            </div>
            <div className="html-content ml-7 text-base text-white md:text-lg lg:text-xl" dangerouslySetInnerHTML={{ __html: location.parking }} />
          </div>
        )}
        {isValidContent(location.planning ?? '') && (
          <div className="mb-10 flex" data-aos="fade-up" data-aos-delay="800">
            <div className="h-8 w-8">
              <img src="/images/calendar.png" alt="Planning" width={30} height={30} />
            </div>
            <div className="html-content ml-7 text-base text-white md:text-lg lg:text-xl" dangerouslySetInnerHTML={{ __html: location.planning }} />
          </div>
        )}
        {location.buttonLink && (
          <div data-aos="fade-up" data-aos-delay="1000">
            <Link
              href={location.buttonLink}
              target="_blank"
              className="mt-10 rounded-full border-2 border-[#a9b394] bg-[#d5ddcb] px-12 py-5 text-xl uppercase text-[#CAA168]"
            >
              {location.buttonText || "Je m'inscris"}
            </Link>
          </div>
        )}
      </div>
      <img
        src={`${appConfig.apiUrl}/v1/images/locations/${location.image}`}
        alt={location.title}
        className="mt-5 h-[350px] w-full max-w-full rounded-xl object-cover md:h-[400px] lg:h-[500px] lg:max-w-[450px]"
        data-aos="fade-up"
        data-aos-delay="300"
      />
    </div>
  );
}

export default function CoursLocations() {
  const { data: locations } = useLocations();
  const [selected, setSelected] = useState<Location | undefined>();
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected && locationRef.current) {
      locationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selected]);

  const publishedLocations = (locations ?? []).filter((l) => l.published);
  if (publishedLocations.length === 0) return null;

  return (
    <>
      <div className="bg-[#fff5e6] px-5 py-10 md:px-24 md:py-10 lg:px-32 lg:py-20">
        <CoursTitle title="Choisis ton lieu de cours" brun />
        <div className="mt-10 flex flex-wrap justify-center gap-x-20 gap-y-20">
          {publishedLocations.map((location) => (
            <div
              key={location.id}
              onClick={() => setSelected(selected?.id === location.id ? undefined : location)}
              className="cursor-pointer"
            >
              <InfosCard location={location} />
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div ref={locationRef} className="bg-[#a9b394] px-5 py-10 md:px-24 md:py-10 lg:px-32 lg:py-20">
          <div className="mb-5 text-center font-[Calmius] text-4xl text-white lg:text-5xl" data-aos="fade-up" data-aos-delay="250" id="location-info">
            <h3 className="font-bold">{selected.title}</h3>
            {selected.subtitle && (
              <div className="text-lg md:text-xl lg:text-2xl" dangerouslySetInnerHTML={{ __html: selected.subtitle }} />
            )}
          </div>
          <CoursTitle title="Infos pratiques" />
          <LocationDetail location={selected} />
        </div>
      )}
    </>
  );
}
