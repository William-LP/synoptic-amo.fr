"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { stagger, fadeInUp } from "@/lib/animations";
import WaveDivider from "./WaveDivider";

const LOGOS = [
  "xl_media_image9.png",
  "xl_media_image10.png",
  "xl_media_image12.png",
  "xl_media_image13.png",
  "xl_media_image14.png",
  "xl_media_image15.png",
  "xl_media_image16.png",
  "xl_media_image17.png",
  "xl_media_image18.png",
  "xl_media_image19.png",
  "xl_media_image20.png",
  "xl_media_image21.png",
  "xl_media_image23.jpeg",
  "xl_media_image25.png",
  "xl_media_image26.png",
  "xl_media_image28.png",
  "xl_media_image29.jpeg",
  "xl_media_image30.jpeg",
  "xl_media_image31.png",
  "xl_media_image32.png",
  "xl_media_image33.jpeg",
  "xl_media_image42.png",
  "xl_media_image43.png",
  "xl_media_image44.png",
  "xl_media_image45.png",
  "xl_media_image46.gif",
  "xl_media_image47.jpeg",
  "xl_media_image48.png",
  "xl_media_image49.png",
  "xl_media_image50.jpeg",
  "xl_media_image51.jpeg",
  "xl_media_image61.png",
  "xl_media_image67.png",
  "xl_media_image87.png",
  "xl_media_image96.png",
  "xl_media_image97.png",
  "xl_media_image98.png",
  "xl_media_image103.png",
  "xl_media_image105.png",
  "xl_media_image106.png",
  "xl_media_image107.png",
  "xl_media_image108.png",
  "xl_media_image113.png",
  "xl_media_image115.png",
  "xl_media_image116.png",
  "xl_media_image117.png",
  "xl_media_image119.png",
  "xl_media_image120.png",
  "xl_media_image121.png",
  "xl_media_image122.png",
  "xl_media_image123.png",
  "xl_media_image124.png",
  "xl_media_image125.jpeg",
  "xl_media_image126.png",
  "xl_media_image132.png",
  "xl_media_image133.jpeg",
  "xl_media_image135.png",
  "xl_media_image136.png",
  "xl_media_image137.png",
  "Ministere_de_lEconomie_des_Finances_et_de_la_Souverainete_industrielle_et_numerique.svg-1024x622.png",
];

const half = Math.ceil(LOGOS.length / 2);
const row1 = LOGOS.slice(0, half);
const row2 = LOGOS.slice(half);

function LogoCard({ file }: { file: string }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <div className="shrink-0 w-36 h-20 mx-4 flex items-center justify-center bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#00A099]/30 transition-all p-3">
      <Image
        src={`${basePath}/img/logos/${file}`}
        alt=""
        width={120}
        height={56}
        className="object-contain max-h-14 w-full grayscale hover:grayscale-0 transition-all duration-300"
        unoptimized
      />
    </div>
  );
}

function MarqueeRow({ logos, reverse }: { logos: string[]; reverse?: boolean }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="flex overflow-hidden">
      <div
        className="flex shrink-0 animate-marquee"
        style={reverse ? { animationDirection: "reverse", animationDuration: "50s" } : { animationDuration: "45s" }}
      >
        {doubled.map((file, i) => (
          <LogoCard key={`${file}-${i}`} file={file} />
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <section
      id="references"
      ref={sectionRef}
      className="relative bg-[#f7f9fc] pb-0 pt-24 lg:pt-32 overflow-hidden"
    >
      {/* Blob accent */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#00A099]/6 blur-3xl pointer-events-none"
        style={{ borderRadius: "50% 30% 60% 40% / 40% 50% 50% 60%" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-12"
          style={{ y: titleY }}
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

        <div className="mb-4">
          <MarqueeRow logos={row1} />
        </div>
        <MarqueeRow logos={row2} reverse />
      </div>

      {/* Wave to white (Contact section) */}
      <div className="mt-16">
        <WaveDivider fillColor="white" flip />
      </div>
    </section>
  );
}
