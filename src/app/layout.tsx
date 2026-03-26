import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/**
 * Inter is the reliable fallback. Aptos is loaded via @font-face in globals.css —
 * it will activate automatically once you place Aptos.ttf / Aptos-SemiBold.ttf /
 * Aptos-Bold.ttf in public/fonts/ (run `bash scripts/download-assets.sh`).
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SYNOPTIC AMO — Assistance à Maîtrise d'Ouvrage",
  description:
    "SYNOPTIC AMO accompagne les maîtres d'ouvrage publics et privés dans toutes les phases de leurs projets de construction, de la définition des besoins à la livraison.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f7f9fc] text-[#124761]">
        {children}
      </body>
    </html>
  );
}
