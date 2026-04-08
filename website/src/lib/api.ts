import type { AppData } from "@/app/types/appData";
import type { Article } from "@/lib/articles";

const STRAPI_API_URL = process.env.STRAPI_API_URL ?? "http://localhost:1337/api";

const STRAPI_MEDIA_BASE = STRAPI_API_URL.replace(/\/api\/?$/, "");

function resolveMediaUrl(url?: string): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_MEDIA_BASE}${url}`;
}

async function strapiGet(path: string) {
  let res: Response;
  try {
    res = await fetch(`${STRAPI_API_URL}${path}`, { cache: "no-store" });
  } catch {
    return null;
  }
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Strapi ${path}: ${res.status} ${res.statusText}`);
  }
  const { data } = await res.json();
  return data;
}

export async function fetchAppData(): Promise<AppData> {
  const [
    accueil, mission, equipe, contact, ref,
    membres, agences, partenaires, references, categories,
  ] = await Promise.all([
    strapiGet("/accueil?populate[Carrousel][populate]=Image"),
    strapiGet("/mission?populate=Etape"),
    strapiGet("/equipe?populate=Points"),
    strapiGet("/contact"),
    strapiGet("/ref"),
    strapiGet("/membres?populate[Photo]=true&populate[Parcours]=true&populate[Agence][populate]=Illustration"),
    strapiGet("/agences?populate=Illustration"),
    strapiGet("/partenaires?populate=Logo"),
    strapiGet("/references?populate[logo]=true&populate[categorie_reference]=true&populate[Fiche_reference]=true&pagination[pageSize]=200"),
    strapiGet("/categorie-references"),
  ]);

  return {
    accueil: {
      titre: ((accueil?.Titre ?? []) as { text: string; highlight: boolean }[]),
      sous_titre: accueil?.Sous_titre ?? "",
      linkedin_entreprise: accueil?.linkedin_entreprise ?? null,
      email_entreprise: accueil?.email_entreprise ?? null,
      carrousel: ((accueil?.Carrousel ?? []) as { Image?: { url?: string; alternativeText?: string }; Credit?: string }[])
        .map((e) => ({
          image: resolveMediaUrl(e.Image?.url),
          alt: e.Image?.alternativeText,
          credit: e.Credit,
        }))
        .filter((s) => s.image),
    },

    mission: {
      titre: mission?.Titre ?? "",
      sous_titre: mission?.Sous_titre ?? "",
      etapes: ((mission?.Etape ?? []) as { Titre: string; Sous_titre: string; Description: string }[]).map((e) => ({
        titre: e.Titre,
        sous_titre: e.Sous_titre,
        description: e.Description,
      })),
      cta: {
        titre: mission?.CTA_titre ?? "",
        contenu: mission?.CTA_contenu ?? "",
        bouton: mission?.CTA_bouton ?? "",
      },
    },

    equipe: {
      titre: equipe?.Titre ?? "",
      sous_titre: equipe?.Sous_titre ?? "",
      points: ((equipe?.Points ?? []) as { point: string }[]).map((p) => p.point).filter(Boolean),
    },

    contact: {
      titre: contact?.Titre ?? "",
      sous_titre: contact?.Sous_titre ?? "",
      carte_titre: contact?.Carte_titre ?? "",
      carte_contenu: contact?.Carte_contenu ?? "",
    },

    ref: {
      titre: ref?.Titre ?? "",
      sous_titre: ref?.Sous_titre ?? "",
      titre_2: ref?.Titre_2 ?? "",
      sous_titre_2: ref?.Sous_titre_2 ?? "",
    },

    membres: ((membres ?? []) as {
      Nom: string;
      Titre: string;
      Telephone: string;
      Email: string;
      Linkedin: string;
      Photo?: { url?: string };
      Parcours?: { Date: string; Experience: string }[];
      Agence?: { documentId: string; Ville: string; Adresse: string; Illustration?: { url?: string } };
    }[]).map((m) => ({
      nom: m.Nom,
      titre: m.Titre,
      telephone: m.Telephone,
      email: m.Email,
      linkedin: m.Linkedin,
      photo: resolveMediaUrl(m.Photo?.url),
      parcours: (m.Parcours ?? []).map((p) => ({ date: p.Date, experience: p.Experience })),
      agence: {
        documentId: m.Agence?.documentId ?? "",
        ville: m.Agence?.Ville ?? "",
        adresse: m.Agence?.Adresse ?? "",
        illustration: resolveMediaUrl(m.Agence?.Illustration?.url),
      },
    })),

    agences: ((agences ?? []) as {
      documentId: string;
      Ville: string;
      Adresse: string;
      Illustration?: { url?: string };
    }[]).map((a) => ({
      documentId: a.documentId,
      ville: a.Ville,
      adresse: a.Adresse,
      illustration: resolveMediaUrl(a.Illustration?.url),
    })),

    partenaires: ((partenaires ?? []) as { Logo?: { url?: string } }[])
      .map((p) => resolveMediaUrl(p.Logo?.url))
      .filter(Boolean),

    references: ((references ?? []) as {
      documentId: string;
      Nom_operation: string;
      Maitre_ouvrage: string;
      Surface_metres_carres: string;
      Annee: string;
      logo?: { url?: string };
      Adresse?: { coordinates?: { lat?: number; lng?: number }; components?: { city?: string } };
      Fiche_reference?: { url?: string };
      categorie_reference?: { documentId: string; Categorie: string } | null;
    }[]).map((r) => ({
      documentId: r.documentId,
      nom_operation: r.Nom_operation ?? "",
      maitre_ouvrage: r.Maitre_ouvrage ?? "",
      ville: r.Adresse?.components?.city ?? "",
      surface: r.Surface_metres_carres ?? "",
      annee: r.Annee ?? "",
      logo: resolveMediaUrl(r.logo?.url),
      latitude: r.Adresse?.coordinates?.lat ?? null,
      longitude: r.Adresse?.coordinates?.lng ?? null,
      fiche_reference: resolveMediaUrl(r.Fiche_reference?.url),
      categorie: r.categorie_reference
        ? { documentId: r.categorie_reference.documentId, categorie: r.categorie_reference.Categorie ?? "" }
        : null,
    })),

    categories: ((categories ?? []) as {
      documentId: string;
      Categorie: string;
    }[]).map((c) => ({
      documentId: c.documentId,
      categorie: c.Categorie ?? "",
    })),
  };
}

// ─── Actu (page header) ───────────────────────────────────────────────────────

export async function fetchActuHeader(): Promise<{ titre: string; sous_titre: string }> {
  const data = await strapiGet("/actu");
  return {
    titre: data?.Titre ?? "",
    sous_titre: data?.Sous_titre ?? "",
  };
}

// ─── Actualités ───────────────────────────────────────────────────────────────

interface StrapiActualite {
  documentId: string;
  Titre: string;
  Contenu: string;
  publishedAt: string;
  Couverture?: { url?: string; alternativeText?: string };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractExcerpt(markdown: string): string {
  const line = markdown
    .split("\n")
    .find(
      (l) =>
        l.trim() &&
        !l.startsWith("#") &&
        !l.startsWith("!") &&
        !l.startsWith(">") &&
        !l.startsWith("|") &&
        !l.startsWith("-")
    ) ?? "";
  const plain = line.replace(/\*\*?|__?|`/g, "").trim();
  return plain.length > 200 ? plain.slice(0, 200) + "…" : plain;
}

function estimateReadingTime(text: string): number {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
}

function mapActualite(item: StrapiActualite): Article {
  return {
    slug: slugify(item.Titre),
    title: item.Titre,
    excerpt: extractExcerpt(item.Contenu ?? ""),
    date: item.publishedAt,
    readingTime: estimateReadingTime(item.Contenu ?? ""),
    cover: resolveMediaUrl(item.Couverture?.url),
    body: item.Contenu ?? "",
  };
}

export async function fetchActualites(): Promise<Article[]> {
  const data = await strapiGet("/actualites?populate=Couverture&sort=publishedAt:desc");
  if (!data) return [];
  return (data as StrapiActualite[]).map(mapActualite);
}

export async function fetchActualite(slug: string): Promise<Article | null> {
  const all = await fetchActualites();
  return all.find((a) => a.slug === slug) ?? null;
}
