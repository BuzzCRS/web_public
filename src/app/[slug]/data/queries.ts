import { gql } from "@apollo/client";

export const GET_LINKS = gql`
  query getLinks($path: String) {
    _unauthedLinks(path: $path) {
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
  query getProperty($path: String!) {
    _unauthedProperty(path: $path) {
      name
      # brand_logo_url
      brand_color
    }
  }
`;
