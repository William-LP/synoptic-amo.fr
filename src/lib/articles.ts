export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO 8601
  category: string;
  readingTime: number; // minutes
  body: string; // HTML
}

export const articles: Article[] = [];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
