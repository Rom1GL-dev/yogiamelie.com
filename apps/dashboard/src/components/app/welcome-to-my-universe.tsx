import LayoutApp from '@/components/layout/app/layout-app.tsx';
import { useStores } from '@/providers/stores-provider.tsx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

export const WelcomeToMyUniverse = observer(() => {
  const { siteWebStore } = useStores();

  const [fields, setFields] = useState({
    title: ' ',
    description: '',
    image: ''
  });

  useEffect(() => {
    (async () => {
      await siteWebStore.onInit('welcome');
      const sectionDetails = siteWebStore.getDetailsBySection('welcome');

      setFields({
        title: sectionDetails?.details?.title,
        description: sectionDetails?.details?.description,
        image: sectionDetails?.details?.image
      });
    })();
  }, []);

  return (
    <LayoutApp title={fields.title} background={'#fff5e6'}>
      <div
        className={
          'grid grid-cols-1 gap-x-10 bg-[#fff5e6] text-lg tracking-[0.1em] text-[#2d3640] lg:grid-cols-2'
        }
      >
        <div
          className="custom-html-content"
          dangerouslySetInnerHTML={{ __html: fields.description }}
          data-aos="fade-up"
          data-aos-delay="350"
        />
        <div
          className={'flex items-center justify-center'}
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <img
            src={`http://localhost:3000/v1/images/site-web/${fields.image}`}
            title={fields.title}
            alt={fields.title}
            className={
              'mt-10 rounded-4xl object-cover md:mt-0 lg:h-[500px] lg:w-[500px]'
            }
          />
        </div>
      </div>
    </LayoutApp>
  );
});
