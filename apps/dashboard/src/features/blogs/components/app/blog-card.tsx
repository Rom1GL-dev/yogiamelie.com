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
        'mb-7 flex h-[300px] w-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-[#a9b394] text-white transition-all duration-300 hover:scale-101 md:h-[250px] lg:h-[350px]'
      }
      onClick={() => navigate(`/blog/${reformatForUrl(blog.title)}-${blog.id}`)}
    >
      <img
        src={`${apiUrl}/v1/images/blogs/${blog.image}`}
        alt={blog.title}
        title={blog.title}
        className={'h-1/2 w-full rounded-t-3xl object-cover'}
      />
      <div className="flex flex-1 flex-col justify-between px-3 py-2 lg:p-3">
        <div>
          <p className={'text-md font-bold'}>{blog.title}</p>
          <p className={'mt-1 font-bold tracking-[0.06em]'}>{blog.subtitle}</p>
          <p
            className={
              'mt-3 line-clamp-1 font-light tracking-[0.06em] lg:line-clamp-2'
            }
          >
            {blog.description.replace(/<[^>]+>/g, '')}
          </p>
        </div>
        <div className="mt-2 flex justify-end">
          <button
            className={
              'cursor-pointer rounded-md border border-black bg-[#eed7c1] px-2 py-1 text-black italic'
            }
          >
            Lire plus
          </button>
        </div>
      </div>
    </div>
  );
}
