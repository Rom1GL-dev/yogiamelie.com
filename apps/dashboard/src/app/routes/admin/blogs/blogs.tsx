import LayoutAdmin from '@/components/layout/admin/layout-admin.tsx';
import { APP_ROUTES } from '@/config/routes.config.ts';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { BlogFilter } from '@/features/blogs/components/admin/blog-filter.tsx';
import { blogStore } from '@/stores/blogs-store.tsx';
import { observer } from 'mobx-react-lite';
import { BlogCard } from '@/features/blogs/components/admin/blog-card.tsx';
import { BlogOption } from '@/features/blogs/components/admin/blog-option.tsx';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from 'react';
import { clsx } from 'clsx';

export const BlogsRoute = observer(() => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <LayoutAdmin
      title="Blogs"
      description={'Liste de tous les blogs.'}
      breadcrumbs={[
        { name: 'Blogs', href: APP_ROUTES.admin.blogs.getHref(), current: true }
      ]}
      button={
        <Link
          to={APP_ROUTES.admin.blogsNew.getHref()}
          className={
            'cursor-pointer rounded-md border border-2 border-dashed border-slate-600 p-1 text-center text-sm text-slate-600 hover:border-slate-400 hover:bg-slate-200 md:p-2 md:text-left md:text-base'
          }
        >
          Nouveau Blog
        </Link>
      }
    >
      <div className="mb-6 flex items-center justify-between">
        <BlogFilter
          selectedType={blogStore.selectedType}
          blogTypes={blogStore.blogTypes}
          onSelect={blogStore.setSelectedType.bind(blogStore)}
        />
        <IconButton
          size={'small'}
          onClick={() => setShowOptions((prev) => !prev)}
        >
          {showOptions ? <FaChevronUp /> : <FaChevronDown />}
        </IconButton>
      </div>
      <BlogOption open={showOptions} />
      <div
        className={clsx('grid grid-cols-1 gap-2 md:gap-5', {
          'lg:grid-cols-2 xl:grid-cols-3': blogStore.filteredBlogs.length > 0
        })}
      >
        {blogStore.filteredBlogs.length > 0 ? (
          blogStore.filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <div className={'mt-5 text-center'}>Aucun Blog trouvé.</div>
        )}
      </div>
    </LayoutAdmin>
  );
});
