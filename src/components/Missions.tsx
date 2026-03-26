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
import { fadeInUp, stagger } from "@/lib/animations";
import WaveDivider from "./WaveDivider";

const STEPS: {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  decorColor: string;
}[] = [
  {
    num: "01",
    title: "Consultation des usagers",
    subtitle: "Définition des besoins",
    description:
      "Analyse des usages, dimensionnement et planification opérationnelle. Nous recueillons vos besoins réels et construisons un programme adapté à votre contexte.",
    icon: Users,
    iconBg: "bg-[#00A099]/15",
    decorColor: "#00A099",
  },
  {
    num: "02",
    title: "Étude de faisabilité",
    subtitle: "Analyse et opportunité",
    description:
      "Évaluation de la faisabilité technique, économique et réglementaire pour sécuriser les décisions stratégiques avant tout engagement.",
    icon: SearchCheck,
    iconBg: "bg-[#124761]/10",
    decorColor: "#124761",
  },
  {
    num: "03",
    title: "Programmation fonctionnelle & technique",
    subtitle: "Rédaction du programme",
    description:
      "Élaboration du programme fonctionnel et technique détaillé — socle indispensable pour le dialogue avec les équipes de maîtrise d'œuvre.",
    icon: BookOpen,
    iconBg: "bg-[#00A099]/15",
    decorColor: "#00A099",
  },
  {
    num: "04",
    title: "Sélection de la maîtrise d'œuvre",
    subtitle: "Procédures marchés publics",
    description:
      "Accompagnement dans les procédures de commande publique : rédaction des avis, analyse des candidatures et accompagnement du jury.",
    icon: Scale,
    iconBg: "bg-[#124761]/10",
    decorColor: "#124761",
  },
  {
    num: "05",
    title: "Suivi du projet en phase conception",
    subtitle: "Expertise & veille programme",
    description:
      "Vérification de la conformité au programme à chaque jalon des études, expertise technique et accompagnement jusqu'à la livraison.",
    icon: ScanEye,
    iconBg: "bg-[#00A099]/15",
    decorColor: "#00A099",
  },
];

function StepCard({
  step,
  position,
  index,
}: {
  step: (typeof STEPS)[0];
  position: "above" | "below";
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: position === "above" ? -20 : 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      {/* Connector line */}
      {position === "above" && <div className="w-px h-16 bg-slate-200 mb-2" />}

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-md shadow-slate-200/80 border border-slate-100 p-4 w-full">
        <div
          className={`w-12 h-12 rounded-xl ${step.iconBg} flex items-center justify-center mb-3 mx-auto`}
        >
          <step.icon size={24} strokeWidth={1.4} style={{ color: step.decorColor }} />
        </div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
          style={{ color: step.decorColor }}
        >
          {step.subtitle}
        </p>
        <h3 className="text-sm font-bold text-[#124761] mb-2 leading-snug">{step.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
      </div>

      {position === "below" && <div className="w-px h-16 bg-slate-200 mt-2" />}
    </motion.div>
  );
}

function MobileStep({ step, index, isLast }: { step: (typeof STEPS)[0]; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#00A099] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md shadow-[#00A099]/30">
          {step.num}
        </div>
        {!isLast && <div className="w-px flex-1 bg-slate-200 mt-2" />}
      </div>
      <div className="pb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: step.decorColor }}>
          {step.subtitle}
        </p>
        <h3 className="text-base font-bold text-[#124761] mb-1.5 leading-snug">{step.title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

export default function Missions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  const { scrollYProgress: titleScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(titleScroll, [0, 1], [-12, 12]);

  const { scrollYProgress: lineProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
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

        {/* ── Horizontal timeline (desktop) ── */}
        <div ref={containerRef} className="hidden lg:block">
          {/* Top row — odd steps (0, 2, 4) */}
          <div className="grid grid-cols-5 items-end">
            {STEPS.map((step, i) =>
              i % 2 === 0
                ? <StepCard key={step.num} step={step} position="above" index={i} />
                : <div key={step.num} />
            )}
          </div>

          {/* Line + circles */}
          <div className="relative flex items-center my-1">
            {/* Gray baseline */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200 -translate-y-px" />
            {/* Animated teal fill */}
            <motion.div
              className="absolute left-0 top-1/2 h-0.5 bg-[#00A099] -translate-y-px origin-left rounded-full"
              style={{ scaleX: lineProgress, width: "100%" }}
            />
            {/* Circles */}
            <div className="grid grid-cols-5 w-full relative z-10">
              {STEPS.map((step) => (
                <div key={step.num} className="flex justify-center">
                  <div className="w-11 h-11 rounded-full bg-[#00A099] text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-[#00A099]/30 border-4 border-[#f7f9fc]">
                    {step.num}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row — even steps (1, 3) */}
          <div className="grid grid-cols-5 items-start">
            {STEPS.map((step, i) =>
              i % 2 !== 0
                ? <StepCard key={step.num} step={step} position="below" index={i} />
                : <div key={step.num} />
            )}
          </div>
        </div>

        {/* ── Vertical fallback (mobile) ── */}
        <div className="lg:hidden space-y-8">
          {STEPS.map((step, i) => (
            <MobileStep key={step.num} step={step} index={i} isLast={i === STEPS.length - 1} />
          ))}
        </div>

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 max-w-xl mx-auto bg-linear-to-br from-[#00A099] to-[#00bfb8] rounded-3xl p-8 text-white text-center shadow-xl shadow-[#00A099]/20"
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
        <WaveDivider fillColor="white" bgColor="#f7f9fc" />
      </div>
    </section>
  );
}
