import { getClient } from "@/lib/client";
import React from "react";
import { GET_LINKS } from "./data/queries";

export const dynamic = "force-dynamic";

export default async function Links() {
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
