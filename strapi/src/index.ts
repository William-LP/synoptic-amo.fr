import type { Core } from '@strapi/strapi';

// Actions that must be publicly accessible (no auth required)
const PUBLIC_ACTIONS = [
  'api::accueil.accueil.find',
  'api::mission.mission.find',
  'api::equipe.equipe.find',
  'api::contact.contact.find',
  'api::ref.ref.find',
  'api::membre.membre.find',
  'api::membre.membre.findMany',
  'api::agence.agence.find',
  'api::agence.agence.findMany',
  'api::partenaire.partenaire.find',
  'api::partenaire.partenaire.findMany',
  'api::reference.reference.find',
  'api::reference.reference.findMany',
  'api::categorie-reference.categorie-reference.find',
  'api::categorie-reference.categorie-reference.findMany',
];

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) return;

    for (const action of PUBLIC_ACTIONS) {
      const existing = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action, role: publicRole.id } });

      if (existing) {
        if (!existing.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({ where: { id: existing.id }, data: { enabled: true } });
        }
      } else {
        await strapi
          .query('plugin::users-permissions.permission')
          .create({ data: { action, role: publicRole.id, enabled: true } });
      }
    }
  },
};
