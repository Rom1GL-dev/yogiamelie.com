import { TBlogModel } from '@/features/blogs/types/blogs.type.ts';
import { TEventModel } from '@/features/events/types/events.type.ts';
import { TLinkModel } from '@/features/links/types/links.type.ts';
import { TLocationModel } from '@/features/locations/types/location.type.ts';

export interface TUserModel {
  id?: string;
  email: string;
  role: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  events: TEventModel[];
  locations: TLocationModel[];
  links: TLinkModel[];
  blogs: TBlogModel[];
  users: TUserModel[];
  account: TUserModel;
}
