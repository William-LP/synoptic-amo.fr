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

/* ── Client list ── */
function getInitials(name: string): string {
  const words = name
    .replace(/^(Ville de|Ville d'|CC |Grand |Agglomération |Métropole de|Conseil |CCAS de|Région |Loire )/i, "")
    .trim()
    .split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

const AVATAR_PALETTE = [
  "#00A099", "#124761", "#3d7ebf", "#7b5ea7",
  "#3da05a", "#c4a227", "#b84f4f", "#e07b39",
  "#2a9a8f", "#4f75b8",
];
function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

const clients = [
  "Ville de Lyon", "Ville de Grenoble", "Annecy Agglo", "Chambéry Métropole",
  "Grand Annecy", "Métropole de Lyon", "Savoie Technolac", "Ville de Bron",
  "Ville de Villeurbanne", "Conseil Régional AuRA", "Ville d'Annemasse",
  "CC du Genevois", "Ville de Thonon-les-Bains", "Agglomération Annecy",
  "SDIS 73", "Haute-Savoie", "Savoie Mont Blanc", "Ville de Bonneville",
  "CC Fier et Usses", "Ville de Rumilly", "Grand Chambéry",
  "Bourg-en-Bresse Agglomération", "Ain Agglomération", "CC Pays du Gier",
  "Ville de Roanne", "Loire Forez Agglomération", "Ville de Firminy",
  "CC Vals du Dauphiné", "CCAS de Grenoble", "Ville de Voiron",
  "Grenoble Alpes Métropole", "Ville de Bourgoin-Jallieu",
];

const track1 = [...clients.slice(0, 16), ...clients.slice(0, 16)];
const track2 = [...clients.slice(16), ...clients.slice(16)];

function ClientChip({ name }: { name: string }) {
  const color = getAvatarColor(name);
  return (
    <div className="shrink-0 flex items-center gap-2.5 px-4 py-2 bg-white border border-slate-100 rounded-xl whitespace-nowrap hover:border-[#00A099]/30 hover:shadow-sm transition-all cursor-default group">
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center text-white font-bold shrink-0 text-[10px]"
        style={{ background: color }}
      >
        {getInitials(name)}
      </div>
      <span className="text-sm text-slate-600 font-medium group-hover:text-[#124761] transition-colors">
        {name}
      </span>
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
      <div className="mt-20 bg-[#f7f9fc] pt-16 pb-0 overflow-hidden">
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
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#f7f9fc] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#f7f9fc] to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden mb-3">
            <div className="animate-marquee flex gap-3 shrink-0">
              {track1.map((name, i) => (
                <ClientChip key={`r1-${i}`} name={name} />
              ))}
            </div>
          </div>

          <div className="flex overflow-hidden">
            <div
              className="animate-marquee flex gap-3 shrink-0"
              style={{ animationDirection: "reverse", animationDuration: "35s" }}
            >
              {track2.map((name, i) => (
                <ClientChip key={`r2-${i}`} name={name} />
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
