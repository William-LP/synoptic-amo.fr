"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { stagger, fadeInLeft, fadeInUp, springCard } from "@/lib/animations";
import WaveDivider from "./WaveDivider";

const offices = [
  {
    city: "Lyon — Villeurbanne",
    address: "105 rue du 4 août 1789",
    zip: "69100 Villeurbanne",
    name: "Gilles CERTAIN",
    email: "gilles.certain@synoptic-amo.fr",
    phone: "07 69 29 44 15",
    mapUrl: "https://maps.google.com/?q=105+rue+du+4+aout+1789+69100+Villeurbanne",
    heroImage: "/img/lyon.jpg",
    index: 0,
  },
  {
    city: "Chambéry — Savoie",
    address: "334 rue Nicolas Parent",
    zip: "73000 Chambéry",
    name: "Marion BAUVENT",
    email: "marion.bauvent@synoptic-amo.fr",
    phone: "07 69 79 83 20",
    mapUrl: "https://maps.google.com/?q=334+rue+Nicolas+Parent+73000+Chambery",
    heroImage: "/img/chambery.jpg",
    index: 1,
  },
];

function OfficeCard({ office }: { office: (typeof offices)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={springCard(office.index)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-[#00A099]/20 hover:shadow-xl hover:shadow-[#00A099]/6 transition-all duration-500"
    >
      {/* City hero image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${office.heroImage}`}
          alt={office.city}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        {/* Gradient overlay — bottom-up for text legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-[#124761]/75 via-[#124761]/20 to-transparent" />

        {/* City name on the image */}
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
          <div>
            <p className="text-white font-bold text-lg leading-tight drop-shadow-sm">
              {office.city}
            </p>
            <p className="text-white/70 text-xs mt-0.5">{office.name}</p>
          </div>
          <a
            href={office.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-medium text-[#124761] rounded-full shadow hover:bg-white transition-colors shrink-0"
          >
            <MapPin size={10} />
            Carte
          </a>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5 text-sm text-slate-500">
            <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
            <span>
              {office.address}<br />{office.zip}
            </span>
          </div>
          <a
            href={`mailto:${office.email}`}
            className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-[#00A099] transition-colors"
          >
            <Mail size={14} className="text-slate-400 shrink-0" />
            <span className="break-all">{office.email}</span>
          </a>
          <a
            href={`tel:${office.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-[#00A099] transition-colors"
          >
            <Phone size={14} className="text-slate-400 shrink-0" />
            {office.phone}
          </a>
        </div>

        <a
          href={`mailto:${office.email}`}
          className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 bg-[#00A099]/8 text-[#00A099] text-sm font-semibold rounded-xl hover:bg-[#00A099] hover:text-white transition-all duration-200"
        >
          Écrire à {office.name.split(" ")[0]}
          <ArrowRight size={14} />
        </a>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="contact" className="relative bg-white pb-0 pt-24 lg:pt-32">
      {/* Blob accent */}
      <div
        className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#124761]/4 blur-3xl pointer-events-none"
        style={{ borderRadius: "40% 60% 50% 50% / 60% 40% 60% 40%" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Left: 2 cols */}
          <motion.div
            ref={titleRef}
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-2"
          >
            <motion.div variants={fadeInLeft} className="inline-flex items-center gap-2 text-[#00A099] text-sm font-semibold uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-[#00A099]" />
              Contact
            </motion.div>
            <motion.h2 variants={fadeInLeft} className="text-3xl lg:text-4xl font-bold text-[#124761] mb-6 leading-tight">
              Parlons de
              <br />votre projet
            </motion.h2>
            <motion.p variants={fadeInLeft} className="text-slate-500 leading-relaxed mb-8">
              Notre équipe est disponible pour répondre à vos questions et vous
              accompagner dans la définition de votre projet. N&apos;hésitez pas
              à nous contacter.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="bg-[#f7f9fc] rounded-2xl p-5 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#00A099]/10 flex items-center justify-center">
                  <Mail size={14} className="text-[#00A099]" />
                </div>
                <span className="font-semibold text-[#124761] text-sm">Réponse rapide</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nous nous engageons à répondre à toute demande dans les
                48h ouvrées.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: office cards — 3 cols */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {offices.map((o) => (
              <OfficeCard key={o.city} office={o} />
            ))}
          </div>
        </div>
      </div>

      {/* Wave to footer (dark bg) */}
      <div className="mt-20">
        <WaveDivider fillColor="#124761" />
      </div>
    </section>
  );
}
