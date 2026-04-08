"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import { stagger, fadeInUp } from "@/lib/animations";
import WaveDivider from "./WaveDivider";
import type { Reference, CategorieReference, RefSection } from "@/app/types/appData";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-slate-500">
        <MapPin size={32} />
        <span className="text-sm">Chargement de la carte…</span>
      </div>
    </div>
  ),
});

function LogoCard({ src, alt }: { src: string; alt?: string }) {
  return (
    <div className="shrink-0 w-36 h-20 mx-3 flex items-center justify-center bg-white dark:bg-[#1c3144] rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-[#00A099]/30 transition-all p-3">
      <Image
        src={src}
        alt={alt ?? ""}
        width={0}
        height={0}
        sizes="120px"
        className="w-full h-auto max-h-14 object-contain transition-all duration-300 opacity-75 hover:opacity-100"
        unoptimized
      />
    </div>
  );
}

interface MapSectionProps {
  refSection?: RefSection;
  references?: Reference[];
  categories?: CategorieReference[];
}

export default function References({ refSection, references = [], categories = [] }: MapSectionProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const mapInView = useInView(titleRef, { once: true });
  const clientsInView = useInView(clientsRef, { once: true });

  const logos = references
    .filter((r) => r.logo)
    .filter((r, i, arr) => arr.findIndex((x) => x.logo === r.logo) === i);
  const half = Math.ceil(logos.length / 2);
  const track1 = logos.length > 0 ? [...logos.slice(0, half), ...logos.slice(0, half)] : [];
  const track2 = logos.length > 0 ? [...logos.slice(half), ...logos.slice(half)] : [];

  return (
    <section id="references" className="relative bg-[#f7f9fc] dark:bg-[#0f1e2a] pb-0 pt-24 lg:pt-32">
      {/* Blob accent */}
      <div
        className="absolute top-0 -left-24 w-[400px] h-[400px] bg-[#124761]/4 blur-3xl pointer-events-none"
        style={{ borderRadius: "40% 60% 50% 50% / 60% 40% 60% 40%" }}
        aria-hidden="true"
      />

      {/* ── Map part ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          variants={stagger}
          initial="hidden"
          animate={mapInView ? "visible" : "hidden"}
          className="max-w-2xl mb-12"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 text-[#00A099] text-sm font-semibold uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#00A099]" />
            Nos références
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-bold text-[#124761] dark:text-slate-100 mb-4 leading-tight">
            {refSection?.titre || ""}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-500 dark:text-slate-400 leading-relaxed">
            {refSection?.sous_titre || ""}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={mapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <MapClient references={references} categories={categories} />
        </motion.div>
      </div>

      {/* ── Clients part ── */}
      <div className="relative mt-20 bg-[#f7f9fc] dark:bg-[#0f1e2a] pt-16 pb-0 overflow-hidden">
        {/* Blob accent */}
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-[#00A099]/6 blur-3xl pointer-events-none"
          style={{ borderRadius: "50% 30% 60% 40% / 40% 50% 50% 60%" }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            ref={clientsRef}
            variants={stagger}
            initial="hidden"
            animate={clientsInView ? "visible" : "hidden"}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 text-[#00A099] text-sm font-semibold uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-[#00A099]" />
              Ils nous font confiance
              <span className="w-8 h-px bg-[#00A099]" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-bold text-[#124761] dark:text-slate-100 mb-4">
              {refSection?.titre_2 || ""}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {refSection?.sous_titre_2 || ""}
            </motion.p>
          </motion.div>
        </div>

        {/* Marquee rows — full bleed */}
        {logos.length > 0 && (
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#f7f9fc] dark:from-[#0f1e2a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#f7f9fc] dark:from-[#0f1e2a] to-transparent z-10 pointer-events-none" />

            <div className="flex overflow-hidden mb-4">
              <div className="animate-marquee flex shrink-0" style={{ animationDuration: "45s" }}>
                {track1.map((ref, i) => (
                  <LogoCard key={`r1-${i}`} src={ref.logo} alt={ref.maitre_ouvrage} />
                ))}
              </div>
            </div>

            <div className="flex overflow-hidden">
              <div
                className="animate-marquee flex shrink-0"
                style={{ animationDirection: "reverse", animationDuration: "50s" }}
              >
                {track2.map((ref, i) => (
                  <LogoCard key={`r2-${i}`} src={ref.logo} alt={ref.maitre_ouvrage} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-16">
          <WaveDivider fillColor="var(--wave-bg-white)" bgColor="var(--wave-bg-light)" />
        </div>
      </div>
    </section>
  );
}
