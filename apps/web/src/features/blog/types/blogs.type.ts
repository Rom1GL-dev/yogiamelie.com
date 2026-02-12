export interface TBlogModel {
  id?: string;
  title: string;
  subtitle?: string;
  type?: string;
  description: string;
  image: File | string;
  published: boolean;
}

export const BLOG_TYPE = {
  PUBLISHED: 'published',
  NOT_PUBLISHED: 'notPublished',
  ALL: 'all'
};

export type BLOG_TYPE = (typeof BLOG_TYPE)[keyof typeof BLOG_TYPE];

export const statusText = {
  published: 'Publié',
  notPublished: 'Non publié'
};

export const statusColor = {
  published: 'bg-green-400',
  notPublished: 'bg-red-400'
};

export type StatusKey = keyof typeof statusColor;
