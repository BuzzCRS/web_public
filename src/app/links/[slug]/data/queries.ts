import { gql } from "@apollo/client";

export const GET_LINKS = gql`
  query getLinks($slug: String) {
    links(slug: $slug) {
      id
      title
      icon
      url
      is_active
      deleted
      updated_at
      property {
        id
        brand_logo_url
        brand_color
      }
    }
  }
`;

export const GET_PROPERTY = gql`
  query getProperty($id: Int!) {
    property(id: $id) {
      name
      brand_logo_url
      brand_color
    }
  }
`;
