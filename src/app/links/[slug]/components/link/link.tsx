import Link from "next/link";

import styles from "./styles.module.css";

export default async function LinkRow({ title, url }) {
  return (
    <li className={styles.listItem}>
      <Link href={url}>{title}</Link>
    </li>
  );
}
