import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://synoptic-amo.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SYNOPTIC AMO — Programmation & Assistance à Maîtrise d'Ouvrage",
    template: "%s | SYNOPTIC AMO",
  },
  description:
    "Assistance à Maîtrise d'Ouvrage et programmation architecturale à Lyon et en Savoie. Accompagnement des collectivités pour leurs projets de construction et d'aménagement",
  keywords: [
    "AMO",
    "assistance à maîtrise d'ouvrage",
    "programmation",
    "maîtrise d'ouvrage",
    "construction",
    "projet de construction",
    "conduite d'opération",
    "maître d'ouvrage public",
    "maître d'ouvrage privé",
  ],
  authors: [{ name: "SYNOPTIC AMO" }],
  creator: "SYNOPTIC AMO",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "SYNOPTIC AMO",
    title: "SYNOPTIC AMO — Programmation & Assistance à Maîtrise d'Ouvrage",
    description:
      "SYNOPTIC AMO accompagne les maîtres d'ouvrage publics et privés dans toutes les phases de leurs projets de construction, de la définition des besoins à la livraison.",
    images: [{ url: "/img/logo.png", alt: "SYNOPTIC AMO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SYNOPTIC AMO — Programmation & Assistance à Maîtrise d'Ouvrage",
    description:
      "SYNOPTIC AMO accompagne les maîtres d'ouvrage publics et privés dans toutes les phases de leurs projets de construction, de la définition des besoins à la livraison.",
    images: ["/img/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "SYNOPTIC AMO",
              "url": siteUrl,
              "description": "SYNOPTIC AMO accompagne les maîtres d'ouvrage publics et privés dans toutes les phases de leurs projets de construction, de la définition des besoins à la livraison.",
              "inLanguage": "fr-FR",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
