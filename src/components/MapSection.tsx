"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import { stagger, fadeInUp } from "@/lib/animations";
import WaveDivider from "./WaveDivider";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] rounded-3xl bg-slate-100 animate-pulse flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-slate-400">
        <MapPin size={32} />
        <span className="text-sm">Chargement de la carte…</span>
      </div>
    </div>
  ),
});

export default function MapSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="carte" className="relative bg-white pb-0 pt-24 lg:pt-32">
      {/* Blob accent */}
      <div
        className="absolute top-0 -left-24 w-[400px] h-[400px] bg-[#124761]/4 blur-3xl pointer-events-none"
        style={{ borderRadius: "40% 60% 50% 50% / 60% 40% 60% 40%" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-2xl mb-12"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 text-[#00A099] text-sm font-semibold uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#00A099]" />
            Nos références
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-bold text-[#124761] mb-4 leading-tight">
            Présents dans toute
            <br />la région Auvergne-Rhône-Alpes
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-500 leading-relaxed">
            Filtrez nos références par catégorie et cliquez sur un marqueur
            pour découvrir le détail du projet.
          </motion.p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <MapClient />
        </motion.div>
      </div>

      {/* Wave to light bg (Clients section) */}
      <div className="mt-20">
        <WaveDivider fillColor="#f7f9fc" />
      </div>
    </section>
  );
}
