import GoBackBanner from '@/components/app/go-back-banner.tsx';
import { useStores } from '@/providers/stores-provider.tsx';
import { APP_ROUTES } from '@/config/routes.config.ts';
import { useNavigate, useParams } from 'react-router-dom';

export default function BlogDetailsAppRoute() {
  const { blogStore } = useStores();
  const navigation = useNavigate();
  const { slug } = useParams();

  if (!slug) {
    navigation(APP_ROUTES.admin.blogs.getHref());
    return null;
  }

  const blog = blogStore.getBlogByTitle(slug);

  return (
    <div className={'h-screen w-full bg-[#d5ddcb]'}>
      <GoBackBanner />
      <div className="relative h-96 w-full">
        <img
          src={`http://localhost:3000/v1/images/blogs/${blog?.image}`}
          alt={blog?.title || 'Image de l’article'}
          className="h-full w-full rounded-b-[20%] object-cover"
        />

        <div className="absolute inset-0 flex items-center px-32">
          <div
            className="rounded-lg p-6"
            style={{ backgroundColor: 'rgba(255, 245, 230, 0.5)' }}
          >
            <h1 className="font-[Mistrully] text-6xl font-bold text-black">
              {blog?.title}
            </h1>
            <h2 className="mt-5 text-xl font-medium text-gray-800">
              {blog?.subtitle}
            </h2>
          </div>
        </div>
      </div>

      <div className={'mt-10'}>
        <div
          dangerouslySetInnerHTML={{ __html: blog?.description || '' }}
          className="px-32"
        />
      </div>
    </div>
  );
}
