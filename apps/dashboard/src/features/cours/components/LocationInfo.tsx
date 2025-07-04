import { Link } from 'react-router-dom';

interface Props {
  schedule: string;
  address: string;
  parking: string;
  image: string;
  link: string;
}

const isValidContent = (content: string) =>
  content.trim() !== '' && content.trim() !== '<p><br></p>';

export const LocationInfo = ({
  schedule,
  parking,
  address,
  image,
  link
}: Props) => {
  return (
    <div className="font-[TT Chocolates] flex flex-col items-center justify-between tracking-[.1em] lg:flex-row">
      {
        <div>
          {isValidContent(address) && (
            <div className="mb-10 flex" data-aos="fade-up" data-aos-delay="300">
              <div className="h-8 w-8">
                <img
                  src="/images/location.png"
                  alt="Icon location"
                  width={30}
                  height={30}
                  className="mt-1.5"
                />
              </div>
              <div
                className="ml-7 text-base text-white md:text-lg lg:text-xl"
                dangerouslySetInnerHTML={{ __html: address }}
              />
            </div>
          )}
          {isValidContent(parking) && (
            <div className="mb-10 flex" data-aos="fade-up" data-aos-delay="600">
              <div className="h-8 w-8">
                <img
                  src="/images/parking.png"
                  alt="Icon parking"
                  width={40}
                  height={40}
                  className="mt-1.5"
                />
              </div>
              <div className="ml-7 text-base text-white md:text-lg lg:text-xl">
                <div dangerouslySetInnerHTML={{ __html: parking }} />
              </div>
            </div>
          )}
          <div className={'mb-10 flex items-center justify-between'}>
            {isValidContent(schedule) && (
              <div
                className="mb-10 flex"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="h-8 w-8">
                  <img
                    src="/images/calendar.png"
                    alt="Icon calendrier"
                    width={30}
                    height={30}
                  />
                </div>
                <div className="ml-7 flex w-full flex-col text-base text-white md:text-lg lg:text-xl xl:flex-row xl:gap-x-10">
                  <div dangerouslySetInnerHTML={{ __html: schedule }} />
                </div>
              </div>
            )}
          </div>
          <div data-aos="fade-up" data-aos-delay="1000">
            <Link
              to={link}
              target={'_blank'}
              className="signup-button font-[TT Chocolates] mt-10 rounded-full border-2 border-[#a9b394] bg-[#d5ddcb] px-12 py-5 text-xl text-[#CAA168] uppercase"
            >
              Je m&apos;inscris
            </Link>
          </div>
        </div>
      }

      <img
        src={image}
        alt="Image Centre Paramédical"
        className="mt-5 h-[350px] w-full max-w-full rounded-xl object-cover md:h-[400px] lg:h-[450px] lg:max-w-[250px]"
        data-aos="fade-up"
        data-aos-delay="300"
      />
    </div>
  );
};
