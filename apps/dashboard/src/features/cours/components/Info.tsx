import TitleCours from '@/features/cours/components/title-cours.tsx';
import { LocationInfo } from '@/features/cours/components/LocationInfo.tsx';

export const Info = () => {
  const locations = [
    {
      title: 'NOISEUX',
      schedule: 'Les lundis : 18h30-19h45 OU 20h00-21h15',
      address: {
        name: 'Centre paramédical Kiné & TerrHappy',
        street: 'Rue de l’Ourthe, 46A',
        city: '5377 Noiseux (BEL)'
      },
      image: {
        src: '/images/centreParaMed.jpg',
        planning: [
          { month: 'Février', dates: '03, 10, 17, 24' },
          { month: 'Mars', dates: '10, 17, 24, 31' },
          { month: 'Avril', dates: '07, 14, 28' },
          { month: 'Mai', dates: '12, 19, 26' },
          { month: 'Juin', dates: '02, 16, 30' },
          { month: 'Juillet', dates: '07, 14, 28' }
        ]
      }
    },
    {
      title: 'ASSESSE',
      schedule: 'Les mercredis : 18h30-19h45',
      address: {
        name: 'Centre médical & paramédical Santé Plus',
        street: 'Chaussée Nationale 4, 17',
        city: '5330 Sart-Bernard (BEL)'
      },
      image: {
        src: '/images/assesse.jpeg',
        planning: [
          { month: 'Avril', dates: '02, 09, 16, 30' },
          { month: 'Mai', dates: '4, 21, 28' },
          { month: 'Juin', dates: '04, 18' },
          { month: 'Juillet', dates: '02, 09, 16, 30' }
        ]
      }
    }
  ];

  return (
    <div
      id={'info'}
      className={'bg-[#a9b394] px-5 py-10 md:px-24 md:py-10 lg:px-32 lg:py-20'}
    >
      <TitleCours title={'Infos pratiques'} />
      <div className={'grid xl:grid-cols-2 xl:gap-x-20'}>
        {locations.map((location, index) => (
          <LocationInfo key={index} {...location} />
        ))}
      </div>
    </div>
  );
};
