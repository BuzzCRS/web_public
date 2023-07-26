import { getClient } from "@/lib/client";
import { GET_LINKS, GET_PROPERTY } from "./data/queries";
import Image from "next/image";
import styles from "./styles.module.css";
import { getDynamicStyles } from "./helpers";
import LinkRow from "./components/link/link";

export default async function Links({ params }) {
  const { slug } = params;
  const path = decodeURIComponent(slug);

  const {
    data: linksRes,
    loading,
    error,
  } = await getClient().query({
    query: GET_LINKS,
    variables: {
      path,
    },
  });

  const links = linksRes._unauthedLinks || [];

  const { data: propertyRes, error: error2 } = await getClient().query({
    query: GET_PROPERTY,
    variables: {
      path,
    },
  });

  const property = propertyRes?._unauthedProperty;
  const propertyColor = property?.brand_color;
  const propertyLogo = property?.brand_logo_url;
  const propertyName = property?.name;

  const dynamicStyles = getDynamicStyles(propertyColor);
  const isEmptyList = !loading && !links.length;

  return (
    <div className={styles.canvas} style={dynamicStyles}>
      <main className={styles.wrapper}>
        <div className={styles.listWrapper}>
          {propertyLogo ? (
            <div className={styles.avatar}>
              <Image
                src={propertyLogo}
                width={150}
                height={150}
                className={styles.roundedImage}
                alt={propertyName}
                style={{ objectFit: "contain" }}
              />
            </div>
          ) : (
            <h3 className={styles.title}>{propertyName}</h3>
          )}
          {!isEmptyList && (
            <ul className={styles.list}>
              {links.map((l, index) => (
                <LinkRow key={index} url={l.url} title={l.title} />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
