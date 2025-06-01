import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

const BASE_URL = '/v1/images';

const uploadImage = async (file: File, category: string): Promise<any> => {
  const formData = new FormData();
  formData.append('image', file);

  return api.post(`${BASE_URL}/upload/${category}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationKey: ['upload-image'],
    mutationFn: async ({ file, category }: { file: File; category: string }) =>
      uploadImage(file, category)
  });
};
