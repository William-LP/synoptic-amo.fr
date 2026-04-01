"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, Award, Briefcase } from "lucide-react";
import LinkedinIcon from "./LinkedinIcon";
import { stagger, fadeInUp, fadeInLeft, springCard } from "@/lib/animations";
import WaveDivider from "./WaveDivider";

const PARTNERS = [
  "GEVOLYS.png", "TERRE-ECO.png", "Synapse-768x192.jpg", "oe.png",
  "LOGO_KALEIDO-WEB-2-768x148.jpg", "inddigo.jpg", "ICAMO.png", "ESSOR.png",
  "EODD.png", "EA-768x515.png", "AXONE.png", "AUXILIUM.png", "ARBRE.jpg",
  "artelia.jpg", "Amoes.png", "A2CSPORTS-768x270.png", "2OINGENIERE-768x325.png",
  "Alphaico-768x342.jpg", "BETEM.jpg", "dpgco-768x421.jpg", "magma-768x564.jpg",
];

function PartnerLogo({ file }: { file: string }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <div className="shrink-0 w-32 h-16 mx-4 flex items-center justify-center">
      <Image
        src={`${basePath}/img/partners/${file}`}
        alt=""
        width={0}
        height={0}
        sizes="128px"
        className="w-full h-auto max-h-12 object-contain transition-all duration-300 opacity-75 hover:opacity-100"
        unoptimized
      />
    </div>
  );
}

const members = [
  {
    name: "Gilles CERTAIN",
    role: "Programmiste expérimenté",
    title: "Dirigeant & Programmiste",
    office: "Lyon — Villeurbanne",
    address: "105 rue du 4 août 1789, 69100 Villeurbanne",
    email: "gilles.certain@synoptic-amo.fr",
    phone: "07 69 29 44 15",
    photo: "/img/photo-gilles.jpg",
    experience: "19 ans d'expérience en programmation",
    specialty: "Équipements publics (600+ projets réalisés)",
    career: [
      { years: "Depuis 2023", label: "Dirigeant — SYNOPTIC AMO, Lyon" },
      { years: "2018 – 2022", label: "Programmiste senior — SAMOP Rhône-Alpes" },
      { years: "2012 – 2017", label: "Programmiste senior — PARVIS-MENIGHETTI" },
      { years: "2006 – 2011", label: "Chef de projet — MENIGHETTI, Paris" },
    ],
    color: "from-[#00A099] to-[#00bfb8]",
  },
  {
    name: "Marion BAUVENT",
    role: "Architecte & Programmiste",
    title: "Programmiste senior",
    office: "Chambéry — Savoie",
    address: "334 rue Nicolas Parent, 73000 Chambéry",
    email: "marion.bauvent@synoptic-amo.fr",
    phone: "07 69 79 83 20",
    photo: "/img/photo-marion.jpg",
    experience: "10 ans d'expérience",
    specialty: "Expertise fonctionnelle, technique & réglementaire",
    career: [
      { years: "Depuis 2024", label: "Programmiste senior — SYNOPTIC AMO, Chambéry" },
      { years: "2022 – 2023", label: "Programmiste senior — ABAMO&CO" },
      { years: "2019 – 2021", label: "Architecte — CIMEA Architecte" },
      { years: "2015 – 2018", label: "Assistante architecte — PATRIARCHE" },
    ],
    color: "from-[#124761] to-[#1a5c7a]",
  },
];

function TeamCard({
  member,
  index,
}: {
  member: (typeof members)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={springCard(index)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group bg-white dark:bg-[#1c3144] rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:border-[#00A099]/20 hover:shadow-2xl hover:shadow-[#00A099]/8 transition-all duration-500"
    >
      {/* Card header with photo */}
      <div className={`relative h-52 bg-linear-to-br ${member.color} overflow-hidden`}>
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute top-4 -right-4 w-24 h-24 rounded-full bg-white/8" />

        {/* Photo */}
        <div className="absolute bottom-0 right-6 w-36 h-44 overflow-hidden rounded-t-2xl">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${member.photo}`}
            alt={member.name}
            fill
            className="object-cover object-top"
            sizes="144px"
          />
        </div>

        {/* Name badge */}
        <div className="absolute bottom-4 left-6">
          <h3 className="font-bold text-xl text-white leading-tight">{member.name}</h3>
          <p className="text-white/75 text-sm mt-0.5">{member.title}</p>
        </div>
      </div>

      <div className="p-6">
        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00A099]/8 dark:bg-[#00A099]/15 text-[#00A099] text-xs font-medium rounded-full">
            <Award size={11} />
            {member.experience}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#124761]/6 dark:bg-slate-700 text-[#124761] dark:text-slate-200 text-xs font-medium rounded-full">
            <Briefcase size={11} />
            {member.specialty}
          </span>
        </div>

        {/* Career timeline */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Parcours</p>
          <div className="space-y-2">
            {member.career.map((c, i) => (
              <div key={i} className="flex gap-3 text-xs">
                <span className="text-[#00A099] font-semibold shrink-0 w-20">{c.years}</span>
                <span className="text-slate-500 dark:text-slate-400 leading-relaxed">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact details */}
        <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin size={13} className="text-slate-400 mt-0.5 shrink-0" />
            <span>{member.address}</span>
          </div>
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 hover:text-[#00A099] transition-colors"
          >
            <Mail size={13} className="text-slate-400 shrink-0" />
            <span className="truncate">{member.email}</span>
          </a>
          <a
            href={`tel:${member.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 hover:text-[#00A099] transition-colors"
          >
            <Phone size={13} className="text-slate-400 shrink-0" />
            {member.phone}
          </a>
        </div>

        {/* LinkedIn */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <a
            href="https://www.linkedin.com/company/synoptic-amo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 hover:text-[#00A099] transition-colors"
          >
            <LinkedinIcon size={13} />
            LinkedIn
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <section id="equipe" ref={sectionRef} className="relative bg-white dark:bg-[#162534] pb-0 pt-24 lg:pt-32">
      {/* Blob accent */}
      <div
        className="absolute top-1/3 -right-24 w-112.5 h-112.5 bg-[#00A099]/5 blur-3xl pointer-events-none"
        style={{ borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <motion.div
            ref={titleRef}
            variants={stagger}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            style={{ y: titleY }}
          >
            <motion.div variants={fadeInLeft} className="inline-flex items-center gap-2 text-[#00A099] text-sm font-semibold uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-[#00A099]" />
              Notre équipe
            </motion.div>
            <motion.h2 variants={fadeInLeft} className="text-3xl lg:text-4xl font-bold text-[#124761] dark:text-slate-100 mb-6 leading-tight">
              Une expertise reconnue
              <br />à votre service
            </motion.h2>
            <motion.p variants={fadeInLeft} className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              SYNOPTIC AMO réunit des programmistes expérimentés qui mettent
              leur savoir-faire au service des maîtres d&apos;ouvrage publics et
              privés, avec réactivité et rigueur.
            </motion.p>
            <motion.div variants={stagger} className="space-y-3">
              {[
                "Expertise en programmation architecturale",
                "Maîtrise des procédures marchés publics",
                "Accompagnement réactif et personnalisé",
                "Présence en Auvergne-Rhône-Alpes",
              ].map((item) => (
                <motion.div
                  key={item}
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
                >
                  <div className="w-5 h-5 rounded-full bg-[#00A099]/10 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00A099]" />
                  </div>
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
            {members.map((m, i) => (
              <TeamCard key={m.name} member={m} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Partners carousel */}
      <div className="mt-20 border-t border-slate-100 dark:border-slate-700 pt-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8 text-center">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Nos partenaires</p>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white dark:from-[#162534] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white dark:from-[#162534] to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee" style={{ animationDuration: "30s" }}>
            {[...PARTNERS, ...PARTNERS].map((file, i) => (
              <PartnerLogo key={i} file={file} />
            ))}
          </div>
        </div>
      </div>

      {/* Wave to light bg (Map section) */}
      <div className="mt-14">
        <WaveDivider fillColor="var(--wave-bg-light)" bgColor="var(--wave-bg-white)" />
      </div>
    </section>
  );
}
