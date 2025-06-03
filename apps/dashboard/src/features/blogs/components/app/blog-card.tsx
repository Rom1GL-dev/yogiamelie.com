import { TBlogModel } from '@/features/blogs/types/blogs.type.ts';
import { useNavigate } from 'react-router-dom';
import { reformatForUrl } from '@/lib/utils.ts';
import { apiUrl } from '@/config/content.config.ts';

interface BlogProps {
  blog: TBlogModel;
}

export default function BlogCard({ blog }: BlogProps) {
  const navigate = useNavigate();
  return (
    <div
      key={blog.id}
      className={
        'mb-7 flex h-[300px] w-full cursor-pointer flex-col rounded-3xl bg-[#a9b394] text-white transition-all duration-300 hover:scale-101 md:h-[325px] lg:h-[350px]'
      }
      onClick={() => navigate(`/blog/${reformatForUrl(blog.title)}`)}
    >
      <img
        src={`${apiUrl}/v1/images/blogs/${blog.image}`}
        alt={blog.title}
        title={blog.title}
        className={'h-1/2 w-full rounded-3xl object-cover'}
      />
      <div className={'flex flex-grow flex-col px-3 lg:p-3'}>
        <div className={'mt-3 flex flex-col'}>
          <p className={'text-md font-bold'}>{blog.title}</p>
          <p
            className={
              'mt-2 mb-3 line-clamp-1 font-light tracking-[0.06em] lg:mb-3 lg:line-clamp-2'
            }
          >
            {blog.description.replace(/<[^>]+>/g, '')}
          </p>
        </div>
      </div>
      <div className={'mb-3 flex items-end justify-end px-3'}>
        <button
          className={
            'cursor-pointer rounded-md border border-black bg-[#eed7c1] p-1 text-black italic'
          }
        >
          Lire plus
        </button>
      </div>
    </div>
  );
}
