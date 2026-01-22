import type { Schema, Struct } from '@strapi/strapi';

export interface CustomTypesAdherants extends Struct.ComponentSchema {
  collectionName: 'components_custom_types_adherants';
  info: {
    displayName: 'adherants';
    icon: 'alien';
  };
  attributes: {
    google_doc_link: Schema.Attribute.String & Schema.Attribute.Required;
    json_data: Schema.Attribute.JSON & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['none', 'json', 'google_docs']> &
      Schema.Attribute.Required;
  };
}

export interface PrixEvenementTarif extends Struct.ComponentSchema {
  collectionName: 'components_prix_evenement_tarifs';
  info: {
    displayName: 'tarif';
    icon: 'priceTag';
  };
  attributes: {
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

export interface UtilsLink extends Struct.ComponentSchema {
  collectionName: 'components_utils_links';
  info: {
    displayName: 'link';
    icon: 'link';
  };
  attributes: {
    font_awesome_class_name: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'fas fa-link'>;
    open_new_page: Schema.Attribute.Boolean;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'custom-types.adherants': CustomTypesAdherants;
      'prix-evenement.tarif': PrixEvenementTarif;
      'utils.link': UtilsLink;
    }
  }
}
