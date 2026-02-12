import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yogiamelie.com/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    {
      url: 'https://yogiamelie.com/a-propos-de-moi',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://yogiamelie.com/blogs',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: 'https://yogiamelie.com/tarifications',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://yogiamelie.com/politique-de-confidentialite',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5
    },
    {
      url: 'https://yogiamelie.com/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6
    },
    {
      url: 'https://yogiamelie.com/mentions-legales',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6
    }
  ];
}
