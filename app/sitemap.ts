import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://lancie.com',
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
