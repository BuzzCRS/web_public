import Link from "next/link";

import styles from "./styles.module.css";

export default async function LinkRow({ title, url }) {
  return (
    <Link
      href={url}
      className={styles.listItem}
      rel="noreferrer"
      target="_blank"
    >
      <li>{title}</li>
    </Link>
  );
}
