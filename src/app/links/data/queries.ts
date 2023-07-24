import { gql } from "@apollo/client";

export const GET_LINKS = gql`
  query {
    links(property_id: 15) {
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
