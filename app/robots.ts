import { MetadataRoute } from 'next'

const BASE_URL = 'https://jaiswalandcodealers.vercel.app/'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',          // Allow crawling main page
        '/products',  // Allow crawling public products page
        '/rejoin'
      ],
      disallow: [
        '/admin',     // ❌ Block the admin dashboard
        '/admin/new', // ❌ Block the product creator page
        '/admin/billing', // ❌ Block your VAT billing console
        '/admin/profit', // ❌ Block the profit calculator matrix
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}