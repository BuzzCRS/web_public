import { getClient } from "@/lib/client";
import { GET_LINKS, GET_PROPERTY } from "./data/queries";
import Image from "next/image";
import styles from "./styles.module.css";
import { getDynamicStyles } from "./helpers";
import LinkRow from "./components/link/link";

export default async function Links({ params }) {
  const { slug } = params;

  let links: Array<any> = [],
    property: any = {};

  try {
    const linksRes = await getClient().query({
      query: GET_LINKS,
      variables: {
        slug,
      },
    });

    links = linksRes.data._unauthedLinks;
  } catch (error) {
    console.log(error);
  }

  try {
    const propertyRes = await getClient().query({
      query: GET_PROPERTY,
      variables: {
        id: links?.[0].property?.id,
      },
    });
    property = propertyRes.data._unauthedProperty;
  } catch (error) {
    console.log(error);
  }

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
