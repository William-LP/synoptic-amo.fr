import Image from "next/image";
import { Mail } from "lucide-react";
import LinkedinIcon from "./LinkedinIcon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#124761] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top section */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="relative w-36 h-10 mb-4">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/logo.png`}
                alt="SYNOPTIC AMO"
                fill
                className="object-contain object-left brightness-0 invert"
                sizes="144px"
              />
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Assistance à Maîtrise d&apos;Ouvrage pour vos projets de
              construction et d&apos;aménagement.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.linkedin.com/company/synoptic-amo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#00A099] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={15} />
              </a>
              <a
                href="mailto:gilles.certain@synoptic-amo.fr"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#00A099] transition-colors"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Accueil", href: "/#accueil" },
                { label: "Nos missions", href: "/#missions" },
                { label: "Notre équipe", href: "/#equipe" },
                { label: "Références", href: "/#references" },
                { label: "Articles", href: "/articles" },
                { label: "Contact", href: "/#contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Nos agences
            </h4>
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-white/70 mb-1">Lyon — Villeurbanne</p>
                <p className="text-xs text-white/40 leading-relaxed mb-1">
                  105 rue du 4 août 1789<br />69100 Villeurbanne
                </p>
                <a href="tel:0769294415" className="text-xs text-[#00A099] hover:text-[#4ECDC4] transition-colors">
                  07 69 29 44 15
                </a>
              </div>
              <div>
                <p className="text-sm font-medium text-white/70 mb-1">Chambéry — Savoie</p>
                <p className="text-xs text-white/40 leading-relaxed mb-1">
                  334 rue Nicolas Parent<br />73000 Chambéry
                </p>
                <a href="tel:0769798320" className="text-xs text-[#00A099] hover:text-[#4ECDC4] transition-colors">
                  07 69 79 83 20
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {year} SYNOPTIC-AMO. Tous droits réservés.
          </p>
          <a
            href="#"
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Mentions légales
          </a>
        </div>
      </div>
    </footer>
  );
}
