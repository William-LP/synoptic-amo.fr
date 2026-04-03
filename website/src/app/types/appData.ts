export type AppData = {
  accueil: Accueil;
  mission: Mission;
  equipe: Equipe;
  contact: ContactSection;
  ref: RefSection;
  membres: Membre[];
  agences: Agence[];
  partenaires: string[];
  references: Reference[];
  categories: CategorieReference[];
}

export type TitrePart = {
  text: string;
  highlight: boolean;
}

export type Accueil = {
  titre: TitrePart[];
  sous_titre: string;
  linkedin_entreprise: string | null;
  email_entreprise: string | null;
  carrousel: {
    image: string;
    alt?: string;
    credit?: string;
  }[];
}

export type ContactSection = {
  titre: string;
  sous_titre: string;
  carte_titre: string;
  carte_contenu: string;
}

export type RefSection = {
  titre: string;
  sous_titre: string;
  titre_2: string;
  sous_titre_2: string;
}

export type Equipe = {
  titre: string;
  sous_titre: string;
  points: string[];
}

export type Mission = {
  titre: string;
  sous_titre: string;
  etapes: {
    titre: string;
    sous_titre: string;
    description: string;
  }[];
  cta: {
    titre: string;
    contenu: string;
    bouton: string;
  };
}

export type CategorieReference = {
  documentId: string;
  categorie: string;
}

export type Reference = {
  documentId: string;
  nom_operation: string;
  maitre_ouvrage: string;
  ville: string;
  surface: string;
  annee: string;
  logo: string;
  latitude: number | null;
  longitude: number | null;
  fiche_reference: string;
  categorie: CategorieReference | null;
}

export type FooterAgence = {
  ville: string;
  adresse: string;
  telephone: string;
}

export type Membre = {
  nom: string;
  titre: string;
  parcours: {
    date: string;
    experience: string;
  }[];
  telephone: string;
  email: string;
  linkedin: string;
  photo: string;
  agence: Agence;
}

export type Agence = {
  documentId: string;
  ville: string;
  adresse: string;
  illustration: string;
}
