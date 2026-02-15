'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLinks } from '@/hooks/use-links';

export const Footer = () => {
  const { data: links } = useLinks();
  const email = 'hello@yogiamelie.be';
  const phone = '+32 493 57 46 15';

  return (
    <div id="contact" className="relative min-h-[80vh] w-full">
      <div className="absolute inset-0">
        <img
          src="/images/amelieFooter.jpg"
          alt="Footer Image"
          title="Footer Image"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#353F34]/90 via-[#353F34]/40 to-transparent" />

      <div className="relative z-10 flex h-full min-h-[80vh] flex-col justify-end px-6 pb-16 md:px-14 lg:px-32">
        <div className="grid grid-cols-1 gap-10 tracking-[0.09rem] text-[#d5ddcb] md:grid-cols-2">
          <div data-aos="fade-right" data-aos-duration="600" data-aos-delay="200">
            <h2 className="mb-5 font-[Mistrully] text-4xl">Contact</h2>
            <p className="text-lg font-extralight md:text-[1.30rem]">
              Amélie Vetcour - Kesharini Yoga
            </p>
            <div className="flex flex-col">
              <a
                href={`mailto:${email}`}
                className="text-lg font-extralight hover:underline md:text-[1.30rem]"
              >
                {email}
              </a>
              <a
                href={`tel:${phone}`}
                className="text-lg font-extralight hover:underline md:text-[1.30rem]"
              >
                {phone}
              </a>
            </div>
            <p className="text-lg font-extralight md:text-[1.30rem]">
              TVA : BE1015 003 050
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <h2 className="mb-5 font-[Mistrully] text-4xl">Suis-moi</h2>
            <div className="flex justify-center gap-x-4 md:justify-end">
              {links?.facebook && (
                <Link
                  href={links.facebook}
                  target="_blank"
                  title="Facebook"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20"
                >
                  <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} />
                </Link>
              )}
              {links?.instagram && (
                <Link
                  href={links.instagram}
                  target="_blank"
                  title="Instagram"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20"
                >
                  <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
                </Link>
              )}
              {links?.youtube && (
                <Link
                  href={links.youtube}
                  target="_blank"
                  title="YouTube"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20"
                >
                  <Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4 text-center text-sm text-gray-400">
          <Link href="/mentions-legales" replace className="hover:underline">
            Mentions légales
          </Link>
        </div>
      </div>
    </div>
  );
};
