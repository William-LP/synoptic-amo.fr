"use client";

import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Users,
  SearchCheck,
  BookOpen,
  Scale,
  ScanEye,
} from "lucide-react";
import { fadeInUp, stagger, springSlide } from "@/lib/animations";
import WaveDivider from "./WaveDivider";

const STEPS: {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
  decorColor: string;
}[] = [
  {
    num: "01",
    title: "Consultation des usagers",
    subtitle: "Définition des besoins",
    description:
      "Analyse des usages, dimensionnement et planification opérationnelle. Nous recueillons vos besoins réels, rencontrons les usagers et construisons un programme adapté à votre contexte.",
    icon: Users,
    gradient: "from-[#e6f7f6] to-[#c8eeec]",
    iconBg: "bg-[#00A099]/15",
    decorColor: "#00A099",
  },
  {
    num: "02",
    title: "Étude de faisabilité",
    subtitle: "Analyse et opportunité",
    description:
      "Évaluation de la faisabilité technique, économique et réglementaire de votre opération pour sécuriser les décisions stratégiques avant tout engagement.",
    icon: SearchCheck,
    gradient: "from-[#e8f0f5] to-[#ccdde8]",
    iconBg: "bg-[#124761]/10",
    decorColor: "#124761",
  },
  {
    num: "03",
    title: "Programmation fonctionnelle & technique",
    subtitle: "Rédaction du programme",
    description:
      "Élaboration du programme fonctionnel et technique détaillé — socle indispensable pour le dialogue avec les équipes de maîtrise d'œuvre et garant de la conformité du projet.",
    icon: BookOpen,
    gradient: "from-[#e6f7f6] to-[#c8eeec]",
    iconBg: "bg-[#00A099]/15",
    decorColor: "#00A099",
  },
  {
    num: "04",
    title: "Sélection de la maîtrise d'œuvre",
    subtitle: "Procédures marchés publics",
    description:
      "Accompagnement dans les procédures de commande publique : rédaction des avis, analyse des candidatures et accompagnement du jury pour sélectionner les meilleures équipes.",
    icon: Scale,
    gradient: "from-[#e8f0f5] to-[#ccdde8]",
    iconBg: "bg-[#124761]/10",
    decorColor: "#124761",
  },
  {
    num: "05",
    title: "Suivi du projet en phase conception",
    subtitle: "Expertise & veille programme",
    description:
      "Vérification de la conformité au programme à chaque jalon des études, expertise technique et accompagnement jusqu'à la livraison de l'ouvrage.",
    icon: ScanEye,
    gradient: "from-[#e6f7f6] to-[#c8eeec]",
    iconBg: "bg-[#00A099]/15",
    decorColor: "#00A099",
  },
];

function TimelineStep({
  step,
  index,
}: {
  step: (typeof STEPS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative mb-20 last:mb-0">
      {/* Circle on the line */}
      <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1 w-12 h-12 rounded-full bg-[#00A099] text-white items-center justify-center font-bold text-sm shadow-lg shadow-[#00A099]/30 z-10 border-4 border-white">
        {step.num}
      </div>

      {/* Row: alternating content / image */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Content block */}
        <motion.div
          variants={springSlide(isEven ? "left" : "right")}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`${isEven ? "md:col-start-1" : "md:col-start-2 md:row-start-1"} ${isEven ? "md:pr-12" : "md:pl-12"}`}
        >
          {/* Mobile step number */}
          <div className="flex items-center gap-3 mb-4 md:hidden">
            <div className="w-10 h-10 rounded-full bg-[#00A099] text-white flex items-center justify-center font-bold text-sm shrink-0">
              {step.num}
            </div>
            <span className="text-xs font-semibold text-[#00A099] uppercase tracking-widest">
              {step.subtitle}
            </span>
          </div>

          <span className="hidden md:inline-block text-xs font-semibold text-[#00A099] uppercase tracking-widest mb-2">
            {step.subtitle}
          </span>
          <h3 className="text-xl lg:text-2xl font-bold text-[#124761] mb-3 leading-snug">
            {step.title}
          </h3>
          <p className="text-slate-500 leading-relaxed text-sm lg:text-base">
            {step.description}
          </p>
        </motion.div>

        {/* Icon card */}
        <motion.div
          variants={springSlide(isEven ? "right" : "left")}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`${isEven ? "md:col-start-2 md:row-start-1" : "md:col-start-1 md:row-start-1"}`}
        >
          <div
            className={`relative aspect-4/3 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/80 bg-linear-to-br ${step.gradient} flex items-center justify-center group`}
          >
            {/* Decorative rings */}
            <div
              className="absolute w-64 h-64 rounded-full border-2 opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ borderColor: step.decorColor }}
            />
            <div
              className="absolute w-44 h-44 rounded-full border opacity-25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ borderColor: step.decorColor }}
            />
            {/* Floating dots */}
            <div
              className="absolute w-3 h-3 rounded-full opacity-30 top-8 right-10"
              style={{ background: step.decorColor }}
            />
            <div
              className="absolute w-2 h-2 rounded-full opacity-20 bottom-10 left-12"
              style={{ background: step.decorColor }}
            />
            <div
              className="absolute w-4 h-4 rounded-full opacity-15 top-16 left-8"
              style={{ background: step.decorColor }}
            />

            {/* Step number — faint background */}
            <span
              className="absolute right-6 bottom-4 text-8xl font-bold opacity-8 select-none leading-none"
              style={{ color: step.decorColor }}
            >
              {step.num}
            </span>

            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative z-10 w-24 h-24 rounded-3xl ${step.iconBg} flex items-center justify-center shadow-sm`}
            >
              <step.icon
                size={44}
                strokeWidth={1.4}
                style={{ color: step.decorColor }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Missions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  /* Parallax on section title */
  const { scrollYProgress: titleScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(titleScroll, [0, 1], [-12, 12]);

  /* Animated center line */
  const { scrollYProgress: lineProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  return (
    <section
      id="missions"
      ref={sectionRef}
      className="relative bg-[#f7f9fc] pb-0 pt-24 lg:pt-32"
    >
      {/* Blob accent */}
      <div
        className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-[#00A099]/5 blur-3xl pointer-events-none"
        style={{ borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          variants={stagger}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          className="max-w-2xl mb-20"
          style={{ y: titleY }}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 text-[#00A099] text-sm font-semibold uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#00A099]" />
            Nos missions
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-bold text-[#124761] mb-4 leading-tight">
            Une méthodologie éprouvée
            <br />à chaque phase de votre projet
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-500 leading-relaxed">
            De la définition de vos besoins à la livraison de votre ouvrage,
            SYNOPTIC AMO met son expertise au service de la réussite de votre
            investissement.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Static gray baseline */}
          <div className="absolute hidden md:block left-1/2 top-6 bottom-6 w-px bg-slate-200 -translate-x-1/2" />
          {/* Animated teal fill */}
          <motion.div
            className="absolute hidden md:block left-1/2 top-6 w-0.5 bg-[#00A099] origin-top -translate-x-1/2 rounded-full"
            style={{ scaleY: lineProgress, height: "calc(100% - 3rem)" }}
          />

          {STEPS.map((step, i) => (
            <TimelineStep key={step.num} step={step} index={i} />
          ))}
        </div>

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 max-w-xl mx-auto bg-linear-to-br from-[#00A099] to-[#00bfb8] rounded-3xl p-8 text-white text-center shadow-xl shadow-[#00A099]/20"
        >
          <h3 className="font-bold text-xl mb-2">Un projet en tête ?</h3>
          <p className="text-white/75 text-sm mb-6 leading-relaxed">
            Discutons ensemble de vos besoins et construisons une approche
            adaptée à votre contexte et à votre calendrier.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#00A099] font-semibold text-sm rounded-full hover:bg-white/90 transition-colors"
          >
            Prendre contact
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>

      {/* Wave to white (Team section) */}
      <div className="mt-20">
        <WaveDivider fillColor="white" />
      </div>
    </section>
  );
}
