import { getClient } from "@/lib/client";
import { GET_LINKS, GET_PROPERTY } from "./data/queries";
import Image from "next/image";
import styles from "./styles.module.css";

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
    <div className={styles.canvas}>
      <main className={styles.wrapper}>
        <div className={styles.list}>
          <div className={styles.avatar}>
            <Image
              src={propertyRes.data.property?.brand_logo_url}
              width={200}
              height={200}
              layout="responsive"
              objectFit="cover"
              className={styles.roundedImage}
              alt={propertyRes.data.property?.name}
            />
          </div>
          {linksRes.data.links.map((l, index) => (
            <p key={index}>
              <span>{l.title}</span>
              <span>{l.url}</span>
            </p>
          ))}
          <p>{JSON.stringify(propertyRes, null, 2)}</p>
        </div>
      </main>
    </div>
  );
}
