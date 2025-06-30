import { makeAutoObservable } from 'mobx';
import { normalizeString, reformatForUrl } from '@/lib/utils';
import { getAllBlogs } from '@/features/blogs/api/get-all-blogs';
import { BLOG_TYPE, TBlogModel } from '@/features/blogs/types/blogs.type.ts';

export class BlogStore {
  blogs: TBlogModel[] = [];
  selectedType: string = 'all';
  searchTerm: string = '';
  loaded = false;

  constructor() {
    makeAutoObservable(this);
    void this.onInit();
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('blogType');
      if (saved) {
        this.selectedType = saved;
      }
    }
  }

  get processedBlogs() {
    return this.blogs.map((blog) => {
      const published = blog.published;

      let type: BLOG_TYPE = BLOG_TYPE.PUBLISHED;

      if (!published) {
        type = BLOG_TYPE.NOT_PUBLISHED;
      }

      return { ...blog, type };
    });
  }

  get filteredBlogs() {
    return this.processedBlogs.filter((blog) => {
      const isTypeMatch =
        this.selectedType === BLOG_TYPE.ALL || blog.type === this.selectedType;
      const isSearchMatch =
        normalizeString(blog.title).includes(
          normalizeString(this.searchTerm)
        ) ||
        (blog.subtitle &&
          normalizeString(blog.subtitle).includes(
            normalizeString(this.searchTerm)
          ));
      return isTypeMatch && isSearchMatch;
    });
  }

  get blogTypes() {
    return [
      {
        key: BLOG_TYPE.ALL,
        label: 'Tous',
        count: this.processedBlogs.length
      },
      {
        key: BLOG_TYPE.PUBLISHED,
        label: 'Publiés',
        count: this.processedBlogs.filter((b) => b.type === BLOG_TYPE.PUBLISHED)
          .length
      },
      {
        key: BLOG_TYPE.NOT_PUBLISHED,
        label: 'Non publiés',
        count: this.processedBlogs.filter(
          (b) => b.type === BLOG_TYPE.NOT_PUBLISHED
        ).length
      }
    ];
  }

  addBlog(blog: TBlogModel) {
    this.blogs.push(blog);
  }

  removeBlogById(id: string) {
    this.blogs = this.blogs.filter((blog) => blog.id && blog.id !== id);
  }

  updateBlogById(payload: TBlogModel) {
    const index = this.blogs.findIndex((blog) => blog.id === payload.id);
    if (index !== -1) {
      this.blogs[index] = { ...this.blogs[index], ...payload };
    }
  }

  getBlogByTitle(title: string) {
    return this.processedBlogs.find(
      (blog) => reformatForUrl(blog.title) === reformatForUrl(title)
    );
  }

  setSelectedType(type: string) {
    this.selectedType = type;
    if (typeof window !== 'undefined') {
      localStorage.setItem('blogType', type);
    }
  }

  setSearchTerm(term: string) {
    this.searchTerm = term;
  }

  async onInit() {
    const res = await getAllBlogs();
    this.blogs = res.blogs;
    this.loaded = true;
  }
}

export const blogStore = new BlogStore();
