import { appConfig } from '@/config/app.config';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Blog } from '@/features/blog/usecases/list-blogs/blog';
import Link from 'next/link';
import { routes } from '@/config/routes.config';

interface Props {
  blog: Blog;
  blogs: Blog[];
}

export function BlogDetailsOther({ blogs, blog }: Props) {
  const latestBlogs = blogs?.slice(0, 3) ?? [];

  return (
    <div className={'mt-20 lg:mt-0'}>
      <h2 className={'text-lg font-medium md:text-xl lg:text-2xl'}>
        Vous pouvez aussi aimer
      </h2>
      {blogs && blogs.length > 1 ? (
        <>
          {latestBlogs.map((post) => {
            if (post.id === blog?.id) return null;
            return (
              <Link
                href={routes.public.blog.getHref() + `/${post.id}`}
                key={post.id}
                className="relative isolate mt-7 flex h-32 flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-40 pb-8 lg:pt-40"
              >
                <Image
                  src={`${appConfig.apiUrl}/v1/images/blogs/${post?.image}`}
                  alt={post.title}
                  className="absolute inset-0 -z-10 size-full object-cover"
                  width={700}
                  height={400}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
                  <time
                    dateTime={dayjs(post.createdAt).format('YYYY-MM-DD HH:mm')}
                    className="mr-8"
                  >
                    {dayjs(post.createdAt).format('DD/MM/YYYY HH:mm')}
                  </time>
                  <div className="-ml-4 flex items-center gap-x-4">
                    <svg
                      viewBox="0 0 2 2"
                      className="-ml-0.5 size-0.5 flex-none fill-white/50"
                    >
                      <circle cx="1" cy="1" r="1" />
                    </svg>
                    <div className="flex gap-x-2.5">
                      <Image
                        src="/images/amelie.jpeg"
                        title={'Auteur'}
                        alt="Amélie VETCOUR"
                        width={24}
                        height={24}
                        className="size-6 flex-none rounded-full bg-white/10"
                      />
                      Amélie VETCOUR
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg/6 font-semibold text-white">
                  <span className="absolute inset-0"></span>
                  {post.title}
                </h3>
              </Link>
            );
          })}
        </>
      ) : (
        <p className={'mt-5 text-gray-400'}>
          Il n&apos;y a pas d&apos;autre blog
        </p>
      )}
    </div>
  );
}
