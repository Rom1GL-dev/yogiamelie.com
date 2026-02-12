import { makeObservable } from 'mobx';
import { fetcher } from '@/lib/fetcher';
import { Blog } from '@/features/blog/usecases/list-blogs/blog';

class BlogService {
  baseUrl = '/blogs';

  constructor() {
    makeObservable(this);
  }

  listAllBlog = async () => {
    try {
      return fetcher.get<Blog[]>(this.baseUrl);
    } catch (error) {
      console.error('error', error);
    }
  };
}

export const blogService = new BlogService();
