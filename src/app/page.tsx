import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Missions from "@/components/Missions";
import Team from "@/components/Team";
import MapSection from "@/components/MapSection";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Missions />
        <Team />
        <MapSection />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
