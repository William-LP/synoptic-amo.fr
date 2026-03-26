"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import WaveDivider from "./WaveDivider";

const SLIDES = [
  {
    src: "/images/image002.jpg",
    alt: "Projet de construction accompagné par SYNOPTIC AMO",
  },
  {
    src: "/images/image001.jpg",
    alt: "Équipement public réalisé avec l'accompagnement SYNOPTIC AMO",
  },
  {
    src: "/images/mission-1.jpg",
    alt: "Consultation des usagers",
  },
  {
    src: "/images/mission-3.jpg",
    alt: "Programmation fonctionnelle et technique",
  },
  {
    src: "/images/mission-5.jpg",
    alt: "Suivi de la phase conception",
  },
];

const HEADLINE_PARTS = [
  { text: "Construisons", highlight: false },
  { text: "ensemble", highlight: false },
  { text: "une base", highlight: false },
  { text: "solide", highlight: true },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Image carousel ── */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[current].src}
              alt={SLIDES[current].alt}
              fill
              priority={current === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark navy overlay */}
        <div className="absolute inset-0 bg-[#124761]/55" />

        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(18,71,97,0.4)_100%)]" />
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#4ECDC4] animate-pulse" />
          Assistance à Maîtrise d&apos;Ouvrage
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 tracking-tight">
          <span className="block">
            {HEADLINE_PARTS.map((part, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.3 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block mr-4 ${
                  part.highlight
                    ? "text-transparent bg-clip-text bg-linear-to-r from-[#4ECDC4] to-[#00A099]"
                    : ""
                }`}
                style={{ perspective: "600px" }}
              >
                {part.text}
              </motion.span>
            ))}
          </span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            pour votre projet
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          SYNOPTIC AMO vous accompagne à chaque étape de vos projets de
          construction — de la définition des besoins jusqu&apos;à la livraison.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#00A099] font-semibold rounded-full hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
          >
            Nous contacter
            <ArrowRight size={18} />
          </a>
          <a
            href="#missions"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            Nos missions
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto"
        >
          {[
            { value: "50+", label: "Clients accompagnés" },
            { value: "2", label: "Agences en France" },
            { value: "5", label: "Phases couvertes" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-4 text-center hover:bg-white/15 transition-colors"
            >
              <div className="text-3xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Carousel controls ── */}
      <div
        className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button
          onClick={prev}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
          aria-label="Image précédente"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
          aria-label="Image suivante"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* ── Dot navigation ── */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setPaused(true); }}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "bg-white w-6 h-2"
                : "bg-white/40 hover:bg-white/70 w-2 h-2"
            }`}
          />
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <a
        href="#missions"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors animate-bounce z-20"
        aria-label="Défiler vers le bas"
      >
        <ChevronDown size={28} />
      </a>

      {/* ── Wave divider ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <WaveDivider fillColor="#f7f9fc" />
      </div>
    </section>
  );
}
