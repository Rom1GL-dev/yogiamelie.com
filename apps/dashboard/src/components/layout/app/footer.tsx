import { Link } from 'react-router-dom';
import { useStores } from '@/providers/stores-provider.tsx';

const Footer = () => {
  const { linkStore } = useStores();

  return (
    <div className="relative flex h-[80vh] w-full items-end">
      <div className="absolute inset-0">
        <img
          src="/images/amelieFooter.jpg"
          alt="Footer Image"
          title="Footer Image"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 z-20 flex w-full items-center justify-center px-5 py-10 tracking-[0.09rem] text-[#d5ddcb] md:relative md:items-start md:justify-start md:px-32 md:py-20 md:text-left">
        <div className="text-left">
          <h2
            className="mb-5 text-lg font-bold uppercase md:text-[1.80rem]"
            data-aos="fade-right"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            Contact
          </h2>
          <p className="text-lg font-extralight md:text-[1.30rem]">
            Amélie Vetcour - Yogi Amélie
          </p>
          <div className={'flex flex-col'}>
            <a
              href="mailto:hello@yogiamelie.be"
              className="text-lg font-extralight hover:underline md:text-[1.30rem]"
            >
              hello@yogiamelie.be
            </a>
            <a
              href="tel:+32493574615"
              className="text-lg font-extralight hover:underline md:text-[1.30rem]"
            >
              +32 493 57 46 15
            </a>
          </div>

          <p className="text-lg font-extralight md:text-[1.30rem]">
            TVA : BE1015 003 050
          </p>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 z-10 flex w-full flex-col items-center px-14 py-10 text-center tracking-[0.09rem] text-[#d5ddcb] md:items-end md:px-32 md:py-20 md:text-right">
        <div className="mb-5 font-bold uppercase md:text-[1.80rem]">
          Suis-moi
        </div>
        <div className="flex justify-center gap-x-6 md:justify-end">
          <Link
            to={linkStore.links.facebook ?? ''}
            target="_blank"
            title="Lien Facebook"
          >
            <img
              src="/icons/facebook.svg"
              alt="Facebook"
              width={45}
              height={45}
              title="Logo Facebook"
            />
          </Link>
          <Link
            to={linkStore.links.instagram ?? ''}
            target="_blank"
            title="Lien Instagram"
          >
            <img
              src="/icons/instagram.svg"
              alt="Instagram"
              width={45}
              height={45}
              title="Logo Instagram"
            />
          </Link>
          <Link
            to={linkStore.links.youtube ?? ''}
            target="_blank"
            title="Lien YouTube"
          >
            <img
              src="/icons/youtube.svg"
              alt="YouTube"
              width={45}
              height={45}
              title="Logo YouTube"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
