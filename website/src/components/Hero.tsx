"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import WaveDivider from "./WaveDivider";
import type { TitrePart } from "@/app/types/appData";

interface HeroSlide {
  src: string;
  alt: string;
  credit?: string;
}

export default function Hero({ titre, slides, sousTitre }: { titre: TitrePart[]; slides: HeroSlide[]; sousTitre: string }) {
  const SLIDES = slides ?? [];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => SLIDES.length ? (c + 1) % SLIDES.length : 0), [SLIDES.length]);
  const prev = useCallback(() => setCurrent((c) => SLIDES.length ? (c - 1 + SLIDES.length) % SLIDES.length : 0), [SLIDES.length]);

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
        {SLIDES.length > 0 && (
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
                src={SLIDES[current].src.startsWith("http") ? SLIDES[current].src : `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${SLIDES[current].src}`}
                alt={SLIDES[current].alt}
                fill
                priority={current === 0}
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
        )}

        {/* Dark navy overlay */}
        <div className="absolute inset-0 bg-[#124761]/55" />

        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(18,71,97,0.4)_100%)]" />
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center w-full">
        {/* Headline — part-by-part reveal */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 tracking-tight">
          {titre.map((part, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.3 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block mr-4 ${part.highlight
                ? "text-transparent bg-clip-text bg-linear-to-r from-[#4ECDC4] to-[#00A099]"
                : ""
                }`}
              style={{ perspective: "600px" }}
            >
              {part.text}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {sousTitre}
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
            href="#references"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            Nos références
          </a>
        </motion.div>
      </div>

      {/* ── Carousel controls ── */}
      {SLIDES.length > 1 && (
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
      )}

      {/* ── Dot navigation ── */}
      {SLIDES.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setPaused(true); }}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current
                ? "bg-white w-6 h-2"
                : "bg-white/40 hover:bg-white/70 w-2 h-2"
                }`}
            />
          ))}
        </div>
      )}

      {/* ── Scroll indicator ── */}
      <a
        href="#missions"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors animate-bounce z-20"
        aria-label="Défiler vers le bas"
      >
        <ChevronDown size={28} />
      </a>

      {/* ── Photo credit ── */}
      <AnimatePresence>
        {SLIDES.length > 0 && SLIDES[current].credit && (
          <motion.p
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute bottom-24 right-4 z-20 text-white/40 text-[10px] tracking-wide"
          >
            © {SLIDES[current].credit}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Wave divider ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <WaveDivider fillColor="var(--wave-bg-light)" />
      </div>
    </section>
  );
}
