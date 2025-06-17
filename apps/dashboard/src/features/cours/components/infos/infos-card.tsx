import { apiUrl } from '@/config/content.config.ts';

interface Props {
  location: {
    title: string;
    image: string | File;
  };
}

export default function InfosCard({ location }: Props) {
  const handleCardClick = () => {
    const element = document.getElementById('location-info');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="pricing-card relative h-96 w-full max-w-[18rem] cursor-pointer flex-col items-center rounded-[2rem] shadow-lg transition-all duration-300 hover:scale-101 sm:max-w-[20rem] md:max-w-[22rem] lg:w-72"
      data-aos="fade-up"
      data-aos-delay={300}
      onClick={handleCardClick}
    >
      <div className="absolute flex h-full w-full items-center justify-center">
        <div className="rounded-lg bg-[#a9b394] px-4 py-6 text-center font-[Seasons] text-xl text-white opacity-80 sm:text-2xl md:text-3xl lg:text-4xl">
          {location.title}
        </div>
      </div>
      <img
        src={`${apiUrl}/v1/images/locations/${location?.image}`}
        alt={location.title}
        className="h-full w-full rounded-[2rem] object-cover"
      />
    </div>
  );
}
