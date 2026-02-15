'use client';
import { useState } from 'react';
import { useLocations, type Location } from '@/hooks/use-locations';
import { appConfig } from '@/config/app.config';
import { MapPin, Car, Calendar, X } from 'lucide-react';
import Link from 'next/link';

function isValidContent(content: string) {
  return content.trim() !== '' && content.trim() !== '<p><br></p>';
}

function LocationCard({ location, onClick }: { location: Location; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative h-72 w-full cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl sm:h-80 md:w-72"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <img
        src={`${appConfig.apiUrl}/v1/images/locations/${location.image}`}
        alt={location.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-lg font-medium text-white">{location.title}</h3>
      </div>
    </button>
  );
}

function LocationModal({ location, onClose }: { location: Location; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-4 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#faf8f5] p-8 shadow-2xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#353F34]/10 text-[#353F34] transition-colors hover:bg-[#353F34]/20"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="flex-1">
            <h3 className="mb-2 font-[Mistrully] text-3xl text-[#353F34] md:text-4xl">
              {location.title}
            </h3>
            {location.subtitle && (
              <div
                className="html-content mb-6 text-base text-[#353F34]/60"
                dangerouslySetInnerHTML={{ __html: location.subtitle }}
              />
            )}

            <div className="space-y-5">
              {isValidContent(location.lieu ?? '') && (
                <div className="flex gap-3">
                  <MapPin size={18} className="mt-1 shrink-0 text-[#c08562]" />
                  <div className="html-content text-base text-[#2d3640]" dangerouslySetInnerHTML={{ __html: location.lieu }} />
                </div>
              )}
              {isValidContent(location.parking ?? '') && (
                <div className="flex gap-3">
                  <Car size={18} className="mt-1 shrink-0 text-[#c08562]" />
                  <div className="html-content text-base text-[#2d3640]" dangerouslySetInnerHTML={{ __html: location.parking }} />
                </div>
              )}
              {isValidContent(location.planning ?? '') && (
                <div className="flex gap-3">
                  <Calendar size={18} className="mt-1 shrink-0 text-[#c08562]" />
                  <div className="html-content text-base text-[#2d3640]" dangerouslySetInnerHTML={{ __html: location.planning }} />
                </div>
              )}
            </div>

            {location.buttonLink && (
              <div className="mt-8">
                <Link
                  href={location.buttonLink}
                  target="_blank"
                  className="inline-block rounded-full bg-[#353F34] px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#2a3229]"
                >
                  {location.buttonText || "Je m'inscris"}
                </Link>
              </div>
            )}
          </div>

          <img
            src={`${appConfig.apiUrl}/v1/images/locations/${location.image}`}
            alt={location.title}
            className="w-full rounded-2xl object-cover shadow-lg lg:max-h-[350px] lg:w-[320px]"
          />
        </div>
      </div>
    </div>
  );
}

export default function CoursLocations() {
  const { data: locations } = useLocations();
  const [selected, setSelected] = useState<Location | undefined>();

  const publishedLocations = (locations ?? []).filter((l) => l.published);
  if (publishedLocations.length === 0) return null;

  return (
    <>
      <div className="grain bg-[#353F34] px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <h2
            className="mb-10 text-center font-[Mistrully] text-3xl text-[#d5ddcb] md:mb-14 md:text-4xl"
            data-aos="fade-up"
          >
            Choisis ton lieu de cours
          </h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {publishedLocations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onClick={() => setSelected(location)}
              />
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <LocationModal location={selected} onClose={() => setSelected(undefined)} />
      )}
    </>
  );
}
