import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/articles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";

export const dynamicParams = false;

export function generateStaticParams() {
  if (articles.length === 0) return [{ slug: "_" }];
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — SYNOPTIC AMO`,
    description: article.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-[#00A099] transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            Tous les articles
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#00A099] bg-[#00A099]/10 px-3 py-1 rounded-full">
              <Tag size={11} />
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500">
              <Calendar size={14} />
              {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500">
              <Clock size={14} />
              {article.readingTime} min de lecture
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-[#124761] dark:text-slate-100 leading-tight mb-6">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10 pb-10 border-b border-slate-200 dark:border-slate-700">
            {article.excerpt}
          </p>

          {/* Body */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {/* Footer nav */}
          <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-700">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#124761] text-white text-sm font-medium rounded-full hover:bg-[#0d3650] transition-colors"
            >
              <ArrowLeft size={16} />
              Retour aux articles
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
