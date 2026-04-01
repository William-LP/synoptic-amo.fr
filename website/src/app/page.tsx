import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Missions from "@/components/Missions";
import Team from "@/components/Team";
import MapSection from "@/components/MapSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { fetchAppData } from "@/lib/api";
import type { FooterAgence } from "@/app/types/appData";

const MEMBER_COLORS = [
  "from-[#00A099] to-[#00bfb8]",
  "from-[#124761] to-[#1a5c7a]",
];

export default async function Home() {
  const data = await fetchAppData();

  const heroSlides = data.accueil.carrousel.map((s) => ({
    src: s.image,
    alt: s.alt ?? "",
    credit: s.credit,
  }));

  const teamMembers = data.membres.map((m, i) => ({
    name: m.nom,
    role: m.titre,
    title: m.titre,
    office: m.agence.ville,
    address: m.agence.adresse,
    email: m.email,
    phone: m.telephone,
    photo: m.photo,
    career: m.parcours.map((p) => ({ years: p.date, label: p.experience })),
    color: MEMBER_COLORS[i % MEMBER_COLORS.length],
    linkedin: m.linkedin,
  }));

  const contactOffices = data.agences
    .filter((agence) => data.membres.some((m) => m.agence.documentId === agence.documentId))
    .map((agence) => {
      const membre = data.membres.find((m) => m.agence.documentId === agence.documentId)!;
      return {
        city: agence.ville,
        address: agence.adresse,
        name: membre.nom,
        email: membre.email,
        phone: membre.telephone,
        heroImage: agence.illustration,
        mapUrl: `https://maps.google.com/?q=${encodeURIComponent([agence.adresse, agence.ville].join(", "))}`,
      };
    });

  const footerAgences: FooterAgence[] = data.agences
    .filter((agence) => data.membres.some((m) => m.agence.documentId === agence.documentId))
    .map((agence) => {
      const membre = data.membres.find((m) => m.agence.documentId === agence.documentId)!;
      return {
        ville: agence.ville,
        adresse: agence.adresse,
        telephone: membre.telephone,
      };
    });

  return (
    <>
      <Navbar />
      <main>
        <Hero titre={data.accueil.titre} slides={heroSlides} sousTitre={data.accueil.sous_titre} />
        <Missions mission={data.mission} />
        <Team equipe={data.equipe} members={teamMembers} partners={data.partenaires} />
        <MapSection
          refSection={data.ref}
          references={data.references}
          categories={data.categories}
        />
        <Contact offices={contactOffices} contactSection={data.contact} />
      </main>
      <Footer agences={footerAgences} />
    </>
  );
}
