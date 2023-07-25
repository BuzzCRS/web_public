import { getClient } from "@/lib/client";
import { GET_LINKS, GET_PROPERTY } from "./data/queries";
import Image from "next/image";
import styles from "./styles.module.css";
import { getDynamicStyles } from "./helpers";
import LinkRow from "./components/link/link";

export default async function Links({ params }) {
  const { slug } = params;

  const {
    data: linksRes,
    loading,
    error,
  } = await getClient().query({
    query: GET_LINKS,
    variables: {
      slug,
    },
  });

  const links = linksRes._unauthedLinks;

  const { data: propertyRes } = await getClient().query({
    query: GET_PROPERTY,
    variables: {
      id: links?.[0].property?.id,
    },
  });

  const property = propertyRes._unauthedProperty;
  const dynamicStyles = getDynamicStyles(property?.brand_color);

  return (
    <div className={styles.canvas} style={dynamicStyles}>
      <main className={styles.wrapper}>
        <div className={styles.listWrapper}>
          <div className={styles.avatar}>
            <Image
              src={property?.brand_logo_url}
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
              className={styles.roundedImage}
              alt={property?.name}
            />
          </div>
          <ul className={styles.list}>
            {links.map((l, index) => (
              <LinkRow key={index} url={l.url} title={l.title} />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
