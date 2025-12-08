import LayoutAdmin from '@/components/layout/admin/layout-admin';
import { useNavigate, useParams } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config';
import { blogStore } from '@/stores/blogs-store';
import BlogForm from '@/features/blogs/components/admin/blog-form.tsx';
import { TBlogModel } from '@/features/blogs/types/blogs.type';
import { useUploadImage } from '@/features/blogs/api/upload-image';
import { generateImageName, reformatForUrl, renameFile } from '@/lib/utils';
import { useDeleteBlog } from '@/features/blogs/api/remove-blog';
import { useUpdateBlog } from '@/features/blogs/api/update-event.ts';
import { useToast } from '@/providers/toast-provider.tsx';

export default function BlogDetailsRoute() {
  const navigation = useNavigate();
  const { slug } = useParams();
  const { showToast } = useToast();
  const uploadImageMutation = useUploadImage();
  const updateBlogMutation = useUpdateBlog();
  const deleteBlogMutation = useDeleteBlog();

  if (!slug) {
    navigation(APP_ROUTES.admin.blogs.getHref());
    return null;
  }

  const blog = blogStore.getBlogByTitle(slug) || undefined;

  const handleSaveBlog = async (
    blogData: TBlogModel,
    isImageChanged: boolean
  ) => {
    let imageName = blogData.image;

    if (isImageChanged) {
      imageName = generateImageName(blogData.title, blogData.image as File);
      const renamedImage = renameFile(blogData.image as File, imageName);

      try {
        await uploadImageMutation.mutateAsync({
          file: renamedImage,
          category: 'blogs'
        });
      } catch (error) {
        showToast({
          type: 'error',
          message: "Erreur lors de l'upload de l'image." + error
        });
        return;
      }
    }

    const payload = {
      id: blogData.id,
      title: blogData.title,
      subtitle: blogData.subtitle,
      description: blogData.description,
      image: imageName as string,
      published: blogData.published
    };

    updateBlogMutation.mutate(payload, {
      onSuccess: () => {
        blogStore.updateBlogById(payload);
        showToast({ type: 'success', message: 'Blog modifié avec succès !' });
        navigation(
          APP_ROUTES.admin.blogs.getHref() +
            '/' +
            reformatForUrl(payload.title) +
            '-' +
            payload.id
        );
      },
      onError: () => {
        showToast({
          type: 'error',
          message: 'Une erreur est survenue lors de la modification du blog.'
        });
      }
    });
  };

  const handleRemoveBlog = (blogId: string) => {
    const payload = {
      id: blogId
    };

    deleteBlogMutation.mutate(payload, {
      onSuccess: () => {
        blogStore.removeBlogById(blogId);
        showToast({
          type: 'success',
          message: 'Blog supprimé avec succès !'
        });
        navigation(APP_ROUTES.admin.blogs.getHref());
      },
      onError: () => {
        showToast({
          type: 'error',
          message: 'Erreur lors de la suppression du blog !'
        });
      }
    });
  };

  return (
    <LayoutAdmin
      title={'Détail du Blog'}
      breadcrumbs={[
        {
          name: 'Blogs',
          href: APP_ROUTES.admin.blogs.getHref(),
          current: false
        },
        { name: 'Détail du blog', href: '', current: true }
      ]}
    >
      <BlogForm
        blog={blog}
        onSave={handleSaveBlog}
        onDelete={handleRemoveBlog}
      />
    </LayoutAdmin>
  );
}
