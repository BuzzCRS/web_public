import Link from "next/link";
import styles from "./styles.module.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
});

export default async function LinkRow({ title, url }) {
  return (
    <Link
      href={url}
      className={`${roboto.className} ${styles.listItem}`}
      rel="noreferrer"
      target="_blank"
    >
      <li>{title}</li>
    </Link>
  );
}
