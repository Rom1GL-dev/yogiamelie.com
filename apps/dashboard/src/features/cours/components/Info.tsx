import TitleCours from '@/features/cours/components/title-cours.tsx';
import { useStores } from '@/providers/stores-provider.tsx';
import InfosCard from '@/features/cours/components/infos/infos-card.tsx';
import { useEffect, useRef, useState } from 'react';
import { TLocationModel } from '@/features/locations/types/location.type.ts';
import { LocationInfo } from '@/features/cours/components/LocationInfo.tsx';
import { apiUrl } from '@/config/content.config.ts';

export const Info = () => {
  const { locationStore } = useStores();
  const [locations, setLocations] = useState<TLocationModel>();
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (locations && locationRef.current) {
      locationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [locations]);

  return (
    <>
      <div
        id="info"
        className="bg-[#fff5e6] px-5 py-10 md:px-24 md:py-10 lg:px-32 lg:py-20"
      >
        <TitleCours title="Choisis ton lieu de cours" brun />
        <div className="mt-10 flex flex-wrap justify-center gap-x-20">
          {locationStore.locations.map((location, index) => {
            if (!location.published) return null;
            return (
              <div
                key={index}
                onClick={() =>
                  setLocations(
                    locations?.title === location.title ? undefined : location
                  )
                }
                className="cursor-pointer"
              >
                <InfosCard location={location} />
              </div>
            );
          })}
        </div>
      </div>

      {locations && (
        <div
          ref={locationRef}
          className="bg-[#a9b394] px-5 py-10 md:px-24 md:py-10 lg:px-32 lg:py-20"
        >
          <div
            className="mb-5 text-center font-[Calmius] text-4xl text-white lg:text-5xl"
            data-aos="fade-up"
            data-aos-delay="250"
            id="location-info"
          >
            <h3 className="font-bold">{locations.title}</h3>
            <div
              className="text-lg md:text-xl lg:text-2xl"
              dangerouslySetInnerHTML={{ __html: locations.subtitle }}
            />
          </div>

          <TitleCours title="Infos pratiques" />

          <div className="flex flex-wrap justify-center gap-6 md:justify-between"></div>

          <LocationInfo
            schedule={locations.planning ?? ''}
            address={locations.lieu ?? ''}
            parking={locations.parking ?? ''}
            image={`${apiUrl}/v1/images/locations/${locations.image}`}
          />
        </div>
      )}
    </>
  );
};
