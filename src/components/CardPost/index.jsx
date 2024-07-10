import Image from "next/image";
import { Avatar } from "../Avatar";
import styles from "./card.module.css";
import Link from "next/link";

export const CardPost = ({ post, highlight }) => {
  return (
    <Link href={`/posts/${post.slug}`} className={styles.link}>
      <article className={styles.article}  style={{ width: highlight === true ? 993 : 486}}>
        <header className={styles.header}>
          <figure className={styles.figure} style={{ height: highlight === true ? 300 : 133}}>
            <Image src={post.cover} fill alt="Capa post" />
          </figure>
        </header>
        <section className={styles.section}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </section>
        <footer className={styles.footer}>
          <Avatar imageSrc={post.author.avatar} name={post.author.username} />
        </footer>
      </article>
    </Link>
  );
};
