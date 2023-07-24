import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import React from "react";

export const dynamic = "force-dynamic";

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

export default async function ServerSide() {
  const result = await getClient().query({
    query: GET_LINKS,
  });

  return (
    <main>
      {result.data.links.map((l, index) => (
        <p key={index}>
          <span>{l.title}</span>
          <span>{l.url}</span>
        </p>
      ))}
    </main>
  );
}
