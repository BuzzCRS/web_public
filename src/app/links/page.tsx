import { getClient } from "@/lib/client";
import { GET_LINKS, GET_PROPERTY } from "./data/queries";
import Image from "next/image";

export const dynamic = "force-dynamic";

const property_id = 15;

export default async function Links() {
  const linksRes = await getClient().query({
    query: GET_LINKS,
    variables: {
      property_id,
    },
  });

  const propertyRes = await getClient().query({
    query: GET_PROPERTY,
    variables: {
      id: property_id,
    },
  });

  return (
    <main>
      <p>{JSON.stringify(propertyRes, null, 2)}</p>
      <main>
        <Image
          src={propertyRes.data.property?.brand_logo_url}
          width={200}
          height={200}
          style={{ borderRadius: "100%" }}
          alt={propertyRes.data.property?.name}
        />
      </main>
      {linksRes.data.links.map((l, index) => (
        <p key={index}>
          <span>{l.title}</span>
          <span>{l.url}</span>
        </p>
      ))}
    </main>
  );
}
