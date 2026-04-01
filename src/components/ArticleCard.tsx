"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { springCard } from "@/lib/animations";
import type { Article } from "@/lib/articles";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleCard({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  return (
    <motion.article
      variants={springCard(index)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="group flex flex-col bg-white dark:bg-[#1c3144] rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Category bar */}
      <div className="h-1 bg-[#00A099]" />

      <div className="flex flex-col flex-1 p-6 lg:p-7">
        {/* Category + date */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#00A099]">
            {article.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <Calendar size={12} />
            {formatDate(article.date)}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-[#124761] dark:text-slate-100 leading-snug mb-3 group-hover:text-[#00A099] transition-colors">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100 dark:border-slate-700">
          <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <Clock size={12} />
            {article.readingTime} min
          </span>
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00A099] hover:gap-2.5 transition-all"
          >
            Lire l&apos;article
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
