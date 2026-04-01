import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions légales — SYNOPTIC AMO",
  description: "Mentions légales du site synoptic-amo.fr",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 min-h-screen bg-white dark:bg-[#162534]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#124761] dark:text-slate-100 mb-10">
            Mentions légales
          </h1>

          <div className="space-y-10 text-slate-600 dark:text-slate-400 leading-relaxed">

            <section>
              <h2 className="text-lg font-semibold text-[#124761] dark:text-slate-200 mb-3">
                Éditeur du site
              </h2>
              <p>
                <strong>SYNOPTIC AMO</strong><br />
                Forme juridique : [PLACEHOLDER — ex : SAS, SARL…]<br />
                Capital social : [PLACEHOLDER]<br />
                SIRET : [PLACEHOLDER]<br />
                Siège social : 105 rue du 4 août 1789, 69100 Villeurbanne<br />
                Téléphone : 07 69 29 44 15<br />
                E-mail :{" "}
                <a href="mailto:contact@synoptic-amo.fr" className="text-[#00A099] hover:underline">
                  contact@synoptic-amo.fr
                </a>
              </p>
              <p className="mt-2">
                Directeur de la publication : [PLACEHOLDER — nom du responsable légal]
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#124761] dark:text-slate-200 mb-3">
                Hébergement
              </h2>
              <p>
                [PLACEHOLDER — nom de l&apos;hébergeur]<br />
                [PLACEHOLDER — adresse]<br />
                [PLACEHOLDER — site web ou téléphone]
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#124761] dark:text-slate-200 mb-3">
                Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble des contenus présents sur ce site (textes, images, graphismes, logo,
                icônes, sons, logiciels…) est la propriété exclusive de SYNOPTIC AMO ou de ses
                partenaires. Toute reproduction, représentation, modification, publication ou
                adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le
                procédé utilisé, est interdite, sauf autorisation écrite préalable de SYNOPTIC AMO.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#124761] dark:text-slate-200 mb-3">
                Données personnelles
              </h2>
              <p>
                Les informations recueillies via le formulaire de contact sont utilisées
                exclusivement pour répondre à vos demandes. Conformément au Règlement Général sur
                la Protection des Données (RGPD) et à la loi « Informatique et Libertés », vous
                disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos
                données. Pour exercer ce droit, contactez-nous à{" "}
                <a href="mailto:contact@synoptic-amo.fr" className="text-[#00A099] hover:underline">
                  contact@synoptic-amo.fr
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#124761] dark:text-slate-200 mb-3">
                Cookies
              </h2>
              <p>
                Ce site n&apos;utilise pas de cookies à des fins publicitaires ou de traçage.
                Des cookies techniques peuvent être utilisés pour assurer le bon fonctionnement
                du site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#124761] dark:text-slate-200 mb-3">
                Réalisation
              </h2>
              <p>
                Site réalisé par{" "}
                <a
                  href="https://zapia.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00A099] hover:underline"
                >
                  zapia.fr
                </a>
                .
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
