"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import LinkedinIcon from "./LinkedinIcon";
import { useTheme } from "./ThemeProvider";

const links = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Missions", href: "/#missions" },
  { label: "Équipe", href: "/#equipe" },
  { label: "Références", href: "/#references" },
  { label: "Articles", href: "/articles" },
];

export default function Navbar({ linkedinEntreprise }: { linkedinEntreprise?: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const solid = !isHome || scrolled;
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid
        ? "bg-white/92 dark:bg-[#0f1e2a]/95 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-700"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-28 h-8 transition-opacity group-hover:opacity-80">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/logo.png`}
                alt="SYNOPTIC AMO"
                fill
                className={`object-contain object-left transition-all duration-300 ${solid ? "dark:brightness-0 dark:invert" : "brightness-0 invert"
                  }`}
                sizes="112px"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-[#00A099] ${solid ? "text-slate-600 dark:text-slate-300" : "text-white/80"
                  }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={toggle}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${solid
                ? "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                : "text-white/70 hover:bg-white/10"
                }`}
              aria-label="Basculer le thème"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            {linkedinEntreprise && (
              <a
                href={linkedinEntreprise}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#134A64] transition-colors flex items-center justify-center shrink-0"
                aria-label="LinkedIn"
              >
                <span className="text-white"><LinkedinIcon size={15} /></span>
              </a>
            )}
            <Link
              href="/#contact"
              className="ml-1 px-5 py-2 bg-[#00A099] text-white text-sm font-medium rounded-full hover:bg-[#008a83] transition-colors shadow-sm"
            >
              Nous contacter
            </Link>
          </nav>

          {/* Mobile buttons */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className={`p-2 rounded-lg transition-colors ${solid ? "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" : "text-white/70 hover:bg-white/10"
                }`}
              aria-label="Basculer le thème"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${solid ? "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700" : "text-white hover:bg-white/10"
                }`}
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
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
            className="lg:hidden overflow-hidden bg-white dark:bg-[#162534] border-t border-slate-100 dark:border-slate-700"
          >
            <nav className="flex flex-col px-6 py-4 gap-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-[#00A099] transition-colors py-1"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-1 px-5 py-2.5 bg-[#00A099] text-white text-sm font-medium rounded-full text-center hover:bg-[#008a83] transition-colors"
              >
                Nous contacter
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
