import type { MetadataRoute } from 'next'
import { fetchActualites } from '@/lib/api'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://synoptic-amo.fr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await fetchActualites()

  return [
    {
      url: BASE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/actualites`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...articles.map((article): MetadataRoute.Sitemap[number] => ({
      url: `${BASE_URL}/actualites/${article.slug}`,
      lastModified: article.date,
      changeFrequency: 'yearly',
      priority: 0.7,
    })),
  ]
}
