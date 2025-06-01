interface Address {
  name: string;
  street: string;
  city: string;
}

interface PlanningEntry {
  month: string;
  dates: string;
}

interface ImageData {
  src: string;
  planning: PlanningEntry[];
}

interface Props {
  title: string;
  schedule: string;
  address: Address;
  image: ImageData;
}

export const LocationInfo = ({ title, schedule, address, image }: Props) => (
  <div className="tracking-[.1em]">
    <div
      className="mb-5 text-center text-xl text-white md:text-2xl lg:text-3xl"
      data-aos="fade-up"
      data-aos-delay="250"
    >
      <h3 className="font-bold">{title}</h3>
      <p className={'text-lg md:text-xl lg:text-2xl'}>{schedule}</p>
    </div>
    <div className="mb-10 flex" data-aos="fade-up" data-aos-delay="300">
      <div className={'h-8 w-8'}>
        <img
          src="/images/location.png"
          alt="Icon location"
          width={30}
          height={30}
          className="mt-1.5"
        />
      </div>
      <div className="ml-7 text-base text-white md:text-lg lg:text-xl">
        <h3 className="font-bold">{address.name}</h3>
        <p className="font-extralight">{address.street}</p>
        <p className="font-extralight">{address.city}</p>
      </div>
    </div>
    <div className="mb-10 flex" data-aos="fade-up" data-aos-delay="600">
      <div className={'h-8 w-8'}>
        <img
          src="/images/parking.png"
          alt="Icon parking"
          width={40}
          height={40}
          className="mt-1.5"
        />
      </div>
      <div className="ml-7 text-base text-white md:text-lg lg:text-xl">
        <h3 className="font-extralight">
          Le centre dispose d&apos;un <b className="font-semibold">parking</b> à
          l&apos;arrière du bâtiment
        </h3>
      </div>
    </div>
    <div className="flex" data-aos="fade-up" data-aos-delay="900">
      <div className={'h-8 w-8'}>
        <img
          src="/images/calendar.png"
          alt="Icon calendrier"
          width={30}
          height={30}
        />
      </div>
      <div className="ml-7 flex w-full flex-col text-base text-white md:text-lg lg:text-xl xl:flex-row xl:gap-x-10">
        <div>
          <h3 className="font-bold">Planning de cours</h3>
          <strong>(Février - Juillet 2025)</strong>
          <div className="mt-5">
            {image.planning.map((entry, index) => (
              <p key={index} className="font-extralight">
                <b className="font-semibold">{entry.month} :</b>
                {entry.dates ? ' ' + entry.dates + ', ' : ''}
              </p>
            ))}
          </div>
        </div>
        <img
          src={image.src}
          alt="Image Centre Paramédical"
          className="mt-5 h-[200px] w-full max-w-full rounded-xl object-cover md:h-[250px] lg:h-[300px] lg:max-w-[250px]"
          data-aos="fade-up"
          data-aos-delay="300"
        />
      </div>
    </div>
  </div>
);
