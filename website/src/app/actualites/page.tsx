import { fetchActualites } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";

export const metadata = {
  title: "Articles — SYNOPTIC AMO",
  description:
    "Actualités, retours d'expérience et éclairages techniques sur l'Assistance à Maîtrise d'Ouvrage.",
};

export default async function ArticlesPage() {
  const articles = await fetchActualites();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 lg:mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#00A099] mb-3">
              Ressources
            </span>
            <h1 className="text-3xl lg:text-5xl font-bold text-[#124761] dark:text-slate-100 leading-tight">
              Actualités
            </h1>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
              Éclairages techniques, retours d&apos;expérience et actualités
              réglementaires autour de l&apos;Assistance à Maîtrise d&apos;Ouvrage.
            </p>
          </div>

          {/* Grid or empty state */}
          {articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5">
                <svg
                  className="w-7 h-7 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-[#124761] dark:text-slate-100">
                Aucun article pour le moment
              </p>
              <p className="mt-2 text-sm text-slate-400 dark:text-slate-500 max-w-xs">
                Les prochaines publications apparaîtront ici.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
