import { MetadataRoute } from 'next'

const BASE_URL = 'https://jaiswalandcodealers.vercel.app/'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ONLY include public pages that customers should find on Google search results.
  return [
    {
      url: BASE_URL,                  // Your Main Page
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,                  // Most important page
    },
    {
      url: `${BASE_URL}/products`,    // Your Public Filterable Product Catalogue Page
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,                  // Very important for customers
    },
  ]
}