'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLinks } from '@/hooks/use-links';

export const Footer = () => {
  const { data: links } = useLinks();
  const email = 'hello@yogiamelie.be';
  const phone = '+32 493 57 46 15';

  return (
    <div id="contact" className="relative flex min-h-[80vh] w-full items-end">
      <div className="absolute inset-0">
        <img
          src="/images/amelieFooter.jpg"
          alt="Footer Image"
          title="Footer Image"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex w-full items-center justify-center px-5 py-10 tracking-[0.09rem] text-[#d5ddcb] md:relative md:items-start md:justify-start md:px-32 md:py-20 md:text-left">
        <div className="pointer-events-auto text-left">
          <h2
            className="mb-5 text-lg font-bold uppercase md:text-[1.80rem]"
            data-aos="fade-right"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            Contact
          </h2>
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
      </div>

      <div className="absolute right-0 bottom-0 z-20 flex w-full flex-col items-center px-14 py-10 text-center tracking-[0.09rem] text-[#d5ddcb] md:items-end md:px-32 md:py-20 md:text-right">
        <div className="mb-5 font-bold uppercase md:text-[1.80rem]">Suis-moi</div>
        <div className="flex justify-center gap-x-6 md:justify-end">
          {links?.facebook && (
            <Link href={links.facebook} target="_blank" title="Facebook">
              <Image src="/icons/facebook.svg" alt="Facebook" width={45} height={45} />
            </Link>
          )}
          {links?.instagram && (
            <Link href={links.instagram} target="_blank" title="Instagram">
              <Image src="/icons/instagram.svg" alt="Instagram" width={45} height={45} />
            </Link>
          )}
          {links?.youtube && (
            <Link href={links.youtube} target="_blank" title="YouTube">
              <Image src="/icons/youtube.svg" alt="YouTube" width={45} height={45} />
            </Link>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 text-center text-sm text-gray-400">
        <Link href="/mentions-legales" replace className="hover:underline">
          Mentions légales
        </Link>
      </div>
    </div>
  );
};
