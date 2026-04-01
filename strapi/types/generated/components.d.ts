import type { Schema, Struct } from '@strapi/strapi';

export interface SynopticCarrousel extends Struct.ComponentSchema {
  collectionName: 'components_synoptic_carrousels';
  info: {
    displayName: 'Carrousel';
  };
  attributes: {
    Credit: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SynopticEtape extends Struct.ComponentSchema {
  collectionName: 'components_synoptic_etapes';
  info: {
    displayName: 'Etape';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Sous_titre: Schema.Attribute.String;
    Titre: Schema.Attribute.String;
  };
}

export interface SynopticParcours extends Struct.ComponentSchema {
  collectionName: 'components_synoptic_parcours';
  info: {
    displayName: 'Parcours';
  };
  attributes: {
    Date: Schema.Attribute.String;
    Experience: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'synoptic.carrousel': SynopticCarrousel;
      'synoptic.etape': SynopticEtape;
      'synoptic.parcours': SynopticParcours;
    }
  }
}
