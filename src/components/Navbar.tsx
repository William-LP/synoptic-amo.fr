"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LinkedinIcon from "./LinkedinIcon";

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "Missions", href: "#missions" },
  { label: "Équipe", href: "#equipe" },
  { label: "Références", href: "#references" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-2.5 group">
            <div className="relative w-28 h-8 transition-opacity group-hover:opacity-80">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/logo.png`}
                alt="SYNOPTIC AMO"
                fill
                className={`object-contain object-left transition-all duration-300 ${
                  scrolled ? "" : "brightness-0 invert"
                }`}
                sizes="112px"
                priority
              />
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-[#00A099] ${
                  scrolled ? "text-slate-600" : "text-white/80"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://www.linkedin.com/company/synoptic-amo"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-[#00A099] ${scrolled ? "text-slate-500" : "text-white/70"}`}
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={17} />
            </a>
            <a
              href="#contact"
              className="ml-1 px-5 py-2 bg-[#00A099] text-white text-sm font-medium rounded-full hover:bg-[#008a83] transition-colors shadow-sm"
            >
              Nous contacter
            </a>
          </nav>

          {/* Mobile button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-100"
          >
            <nav className="flex flex-col px-6 py-4 gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-[#00A099] transition-colors py-1"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 px-5 py-2.5 bg-[#00A099] text-white text-sm font-medium rounded-full text-center hover:bg-[#008a83] transition-colors"
              >
                Nous contacter
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
