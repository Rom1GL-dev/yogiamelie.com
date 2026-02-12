type BaseBlog = {
  title: string;
  subtitle: string;
  description: string;
  image: File | string;
  published: boolean;
};

export type Blog = BaseBlog & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
