import { getClient } from "@/lib/client";
import { GET_LINKS } from "./data/queries";
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

  const links = linksRes._unauthedLinks || [];
  const property = links?.length ? links?.[0].property : {};
  const propertyColor = property?.brand_color;
  const propertyLogo = property?.brand_logo_url;
  const propertyName = property?.name;

  const dynamicStyles = getDynamicStyles(propertyColor);

  const isEmptyList = !loading && !links.length;

  return (
    <div className={styles.canvas} style={isEmptyList ? {} : dynamicStyles}>
      <main className={styles.wrapper}>
        {isEmptyList ? (
          <h3>No links have been added yet!</h3>
        ) : (
          <div className={styles.listWrapper}>
            <div className={styles.avatar}>
              <Image
                src={propertyLogo}
                width={100}
                height={200}
                layout="responsive"
                objectFit="cover"
                className={styles.roundedImage}
                alt={propertyName}
              />
            </div>
            <ul className={styles.list}>
              {links.map((l, index) => (
                <LinkRow key={index} url={l.url} title={l.title} />
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
