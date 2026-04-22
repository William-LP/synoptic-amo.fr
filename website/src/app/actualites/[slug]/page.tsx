import { notFound } from "next/navigation";
import { fetchActualite } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchActualite(slug);
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
  const article = await fetchActualite(slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    ...(article.cover && { "image": article.cover }),
    "datePublished": article.date,
    "author": {
      "@type": "Organization",
      "name": "SYNOPTIC AMO",
      "url": "https://synoptic-amo.fr",
    },
    "publisher": {
      "@type": "Organization",
      "name": "SYNOPTIC AMO",
      "logo": {
        "@type": "ImageObject",
        "url": "https://synoptic-amo.fr/img/logo.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://synoptic-amo.fr/actualites/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Meta + back link */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 mb-6">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-[#00A099] transition-colors"
            >
              <ArrowLeft size={16} />
              Toutes les actualités
            </Link>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500">
                <Calendar size={14} />
                {formatDate(article.date)}
              </span>
              {article.readingTime && (
                <span className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500">
                  <Clock size={14} />
                  {article.readingTime} min de lecture
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-[#124761] dark:text-slate-100 leading-tight mb-6">
            {article.title}
          </h1>

          {/* Cover image */}
          {article.cover && (
            <img
              src={article.cover}
              alt={article.title}
              className="w-full rounded-2xl object-cover max-h-72 mb-10"
            />
          )}

          {/* Body (markdown) */}
          <div className="article-body">
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>

          {/* Footer nav */}
          <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-700">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#124761] text-white text-sm font-medium rounded-full hover:bg-[#0d3650] transition-colors"
            >
              <ArrowLeft size={16} />
              Retour aux actualités
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
