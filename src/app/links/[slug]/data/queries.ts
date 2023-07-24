import { gql } from "@apollo/client";

export const GET_LINKS = gql`
  query getLinks($property_id: Int!) {
    links(property_id: $property_id) {
      id
      title
      icon
      url
      is_active
      deleted
      updated_at
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
