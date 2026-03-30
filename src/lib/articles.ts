export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO 8601
  category: string;
  readingTime: number; // minutes
  body: string; // HTML
}

export const articles: Article[] = [
  {
    slug: "optimiser-suivi-chantier-amo",
    title: "Comment optimiser le suivi de chantier en AMO",
    excerpt:
      "Retour d'expérience sur les bonnes pratiques pour structurer le suivi d'avancement, anticiper les dérives et maintenir le dialogue entre maître d'ouvrage et entreprises.",
    date: "2026-03-15",
    category: "Retour d'expérience",
    readingTime: 6,
    body: `<p>Le suivi de chantier est l'une des missions les plus exigeantes de l'Assistance à Maîtrise d'Ouvrage. Il suppose une présence régulière sur site, une lecture rigoureuse des documents d'exécution et une capacité à arbitrer rapidement entre contraintes techniques, délais et coûts.</p>

<h2>Structurer les visites de chantier</h2>
<p>La première règle est de ne jamais improviser une visite. Chaque passage sur site doit être préparé : consultation du planning actualisé, revue des comptes-rendus précédents, identification des points ouverts. Un ordre du jour transmis 48 heures à l'avance permet d'impliquer les bons interlocuteurs et d'éviter les réunions à rallonge.</p>

<p>Sur place, la méthode des constats photographiés systématiques s'impose. Une image datée vaut mieux qu'un long paragraphe et constitue une pièce opposable en cas de litige.</p>

<h2>Anticiper les dérives</h2>
<p>Les indicateurs à surveiller en priorité sont l'avancement physique par lot, le taux de consommation des réserves financières et le nombre de réserves ouvertes. Un écart de plus de 5 % entre avancement physique et avancement financier mérite une analyse immédiate.</p>

<p>L'outil le plus efficace reste le tableau de bord hebdomadaire partagé avec le maître d'ouvrage : simple, visuel, focalisé sur les tendances plutôt que sur l'exhaustivité.</p>

<h2>Maintenir le dialogue</h2>
<p>L'AMO n'est pas l'ennemi des entreprises. Son rôle est de créer les conditions d'un chantier bien coordonné. Cela passe par une communication transparente, des décisions documentées et une posture de facilitation plutôt que de contrôle.</p>`,
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
