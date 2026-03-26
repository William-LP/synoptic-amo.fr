"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import Image from "next/image";
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

/* ── Client logos ── */
const LOGOS = [
  "xl_media_image9.png", "xl_media_image10.png", "xl_media_image12.png",
  "xl_media_image13.png", "xl_media_image14.png", "xl_media_image15.png",
  "xl_media_image16.png", "xl_media_image17.png", "xl_media_image18.png",
  "xl_media_image19.png", "xl_media_image20.png", "xl_media_image21.png",
  "xl_media_image23.jpeg", "xl_media_image25.png", "xl_media_image26.png",
  "xl_media_image28.png", "xl_media_image29.jpeg", "xl_media_image30.jpeg",
  "xl_media_image31.png", "xl_media_image32.png", "xl_media_image33.jpeg",
  "xl_media_image42.png", "xl_media_image43.png", "xl_media_image44.png",
  "xl_media_image45.png", "xl_media_image46.gif", "xl_media_image47.jpeg",
  "xl_media_image48.png", "xl_media_image49.png", "xl_media_image50.jpeg",
  "xl_media_image51.jpeg", "xl_media_image61.png", "xl_media_image67.png",
  "xl_media_image87.png", "xl_media_image96.png", "xl_media_image97.png",
  "xl_media_image98.png", "xl_media_image103.png", "xl_media_image105.png",
  "xl_media_image106.png", "xl_media_image107.png", "xl_media_image108.png",
  "xl_media_image113.png", "xl_media_image115.png", "xl_media_image116.png",
  "xl_media_image117.png", "xl_media_image119.png", "xl_media_image120.png",
  "xl_media_image121.png", "xl_media_image122.png", "xl_media_image123.png",
  "xl_media_image124.png", "xl_media_image125.jpeg", "xl_media_image126.png",
  "xl_media_image132.png", "xl_media_image133.jpeg", "xl_media_image135.png",
  "xl_media_image136.png", "xl_media_image137.png",
  "Ministere_de_lEconomie_des_Finances_et_de_la_Souverainete_industrielle_et_numerique.svg-1024x622.png",
];

const half = Math.ceil(LOGOS.length / 2);
const track1 = [...LOGOS.slice(0, half), ...LOGOS.slice(0, half)];
const track2 = [...LOGOS.slice(half), ...LOGOS.slice(half)];

function LogoCard({ file }: { file: string }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <div className="shrink-0 w-36 h-20 mx-3 flex items-center justify-center bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#00A099]/30 transition-all p-3">
      <Image
        src={`${basePath}/img/logos/${file}`}
        alt=""
        width={0}
        height={0}
        sizes="120px"
        className="w-full h-auto max-h-14 object-contain grayscale hover:grayscale-0 transition-all duration-300"
        unoptimized
      />
    </div>
  );
}

export default function References() {
  const titleRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const mapInView = useInView(titleRef, { once: true });
  const clientsInView = useInView(clientsRef, { once: true });

  return (
    <section id="references" className="relative bg-white pb-0 pt-24 lg:pt-32">
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
          <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-bold text-[#124761] mb-4 leading-tight">
            Présents dans toute
            <br />la région Auvergne-Rhône-Alpes
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-500 leading-relaxed">
            Filtrez nos références par catégorie et cliquez sur un marqueur
            pour découvrir le détail du projet.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={mapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <MapClient />
        </motion.div>
      </div>

      {/* ── Clients part ── */}
      <div className="relative mt-20 bg-[#f7f9fc] pt-16 pb-0 overflow-hidden">
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
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-bold text-[#124761] mb-4">
              Plus de 50 collectivités
              <br />accompagnées
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 leading-relaxed">
              Collectivités, établissements publics et organismes en
              Auvergne-Rhône-Alpes nous font confiance pour leurs projets de
              construction et d&apos;aménagement.
            </motion.p>
          </motion.div>
        </div>

        {/* Marquee rows — full bleed */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#f7f9fc] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#f7f9fc] to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden mb-4">
            <div className="animate-marquee flex shrink-0" style={{ animationDuration: "45s" }}>
              {track1.map((file, i) => (
                <LogoCard key={`r1-${i}`} file={file} />
              ))}
            </div>
          </div>

          <div className="flex overflow-hidden">
            <div
              className="animate-marquee flex shrink-0"
              style={{ animationDirection: "reverse", animationDuration: "50s" }}
            >
              {track2.map((file, i) => (
                <LogoCard key={`r2-${i}`} file={file} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <WaveDivider fillColor="white" flip />
        </div>
      </div>
    </section>
  );
}
