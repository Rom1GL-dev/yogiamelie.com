import React, { useEffect, useState } from 'react';
import { TBlogModel } from '@/features/blogs/types/blogs.type.ts';
import FormField from '@/components/form-field.tsx';
import { Box, Dialog } from '@mui/material';
import FormImageField from '@/features/events/components/admin/event-form/form-image-field.tsx';

type Props = {
  blog?: TBlogModel;
  onSave: (blogData: TBlogModel, isImageChanged: boolean) => void;
  onDelete?: (blogId: string) => void;
};

const BlogForm = ({ blog, onSave, onDelete }: Props) => {
  const [title, setTitle] = useState(blog?.title || '');
  const [subtitle, setSubtitle] = useState(blog?.subtitle || '');
  const [description, setDescription] = useState(blog?.description || '');
  const [image, setImage] = useState<File | string>(blog?.image || '');
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [published, setPublished] = useState<boolean>(blog?.published || false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    if (blog?.image) {
      setImage(blog.image);
    }
  }, [blog]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setIsImageChanged(true);
    }
  };

  const handleSubmit = () => {
    if (!title) {
      alert('Veuillez ajouter un titre.');
      return;
    }

    onSave(
      {
        id: blog?.id || '',
        title,
        subtitle,
        description,
        image,
        published
      },
      isImageChanged
    );
  };

  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    if (blog && blog.id && onDelete) {
      onDelete(blog.id);
    }
    setOpenDeleteModal(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <div className="col-span-2 space-y-4">
        <FormImageField
          image={image}
          onImageChange={handleImageChange}
          category="blogs"
          name={'blog-image'}
          required
        />

        <FormField
          label="Titre du blog"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <FormField
          label="Sous-titre du blog"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <FormField
          label="Description du blog"
          type="quill"
          value={description}
          onChange={(value: string) => setDescription(value)}
          required
        />
      </div>

      <div className="relative flex flex-col-reverse gap-6 md:flex-col">
        <div className="flex items-center justify-center space-x-4">
          {blog && (
            <button
              onClick={handleDeleteClick}
              className="rounded-md border border-red-500 px-4 py-2 text-red-500"
            >
              Supprimer
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="rounded-md bg-blue-800 px-4 py-2 text-white hover:bg-blue-900"
          >
            Enregistrer
          </button>
        </div>

        <div className="mt-10">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Publié
          </label>
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={() => setPublished(!published)}
            className="relative h-5 w-10 appearance-none rounded-full bg-gray-300 transition duration-300 outline-none before:absolute before:top-0.5 before:left-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition before:duration-300 before:content-[''] checked:bg-blue-600 checked:before:translate-x-5"
          />
        </div>
      </div>

      <Dialog open={openDeleteModal} onClose={handleCloseModal}>
        <Box className={'p-10'}>
          <div className={'text-lg font-bold'}>
            Êtes-vous sûr de vouloir supprimer ce blog ?
          </div>
          <div className={'mt-10 flex justify-end gap-x-4'}>
            <button
              className={
                'cursor-pointer rounded-md border border-gray-500 p-2 text-gray-500 hover:bg-gray-100'
              }
              onClick={handleCloseModal}
            >
              Annuler
            </button>
            <button
              className={
                'cursor-pointer rounded-md bg-red-500 p-2 text-white hover:bg-red-600'
              }
              onClick={handleConfirmDelete}
            >
              Supprimer
            </button>
          </div>
        </Box>
      </Dialog>
    </div>
  );
};

export default BlogForm;
