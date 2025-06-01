import LayoutAdmin from '@/components/layout/admin/layout-admin';
import { APP_ROUTES } from '@/config/routes.config';
import BlogForm from '@/features/blogs/components/admin/blog-form.tsx';
import { TBlogModel } from '@/features/blogs/types/blogs.type';
import { AddBlogDto, useAddBlog } from '@/features/blogs/api/add-blog';
import { useNavigate } from 'react-router-dom';
import { useStores } from '@/providers/stores-provider';
import { useUploadImage } from '@/features/blogs/api/upload-image';
import { generateImageName, renameFile } from '@/lib/utils';
import { useToast } from '@/providers/toast-provider.tsx';
import { AxiosError } from '@/types/axios.ts';

export default function BlogNewRoute() {
  const addBlogMutation = useAddBlog();
  const uploadImageMutation = useUploadImage();
  const navigation = useNavigate();
  const { showToast } = useToast();
  const { blogStore } = useStores();

  const handleSaveBlog = async (blogData: TBlogModel) => {
    const imageName = generateImageName(blogData.title, blogData.image as File);

    const renamedImage = renameFile(blogData.image as File, imageName);

    try {
      await uploadImageMutation.mutateAsync({
        file: renamedImage,
        category: 'blogs'
      });

      const payload: AddBlogDto = {
        title: blogData.title,
        subtitle: blogData.subtitle,
        description: blogData.description,
        image: imageName,
        published: blogData.published
      };

      addBlogMutation.mutate(payload, {
        onSuccess: () => {
          blogStore.addBlog(payload as TBlogModel);
          showToast({
            type: 'success',
            message: 'Blog ajouté avec succès !'
          });
          navigation(APP_ROUTES.admin.blogs.getHref());
        },
        onError: (error: AxiosError) => {
          showToast({
            type: 'success',
            message:
              error.response?.data.message ?? "Erreur lors de l'ajout du blog."
          });
        }
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: "Erreur lors de l'upload de l'image." + error
      });
    }
  };

  return (
    <LayoutAdmin
      title={'Nouveau blog'}
      breadcrumbs={[
        {
          name: 'Blogs',
          href: APP_ROUTES.admin.blogs.getHref(),
          current: false
        },
        { name: 'Nouveau blog', href: '', current: true }
      ]}
    >
      <BlogForm onSave={handleSaveBlog} />
    </LayoutAdmin>
  );
}
