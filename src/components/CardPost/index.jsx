import Image from "next/image";
import { Avatar } from "../Avatar";
import styles from "./card.module.css";
import Link from "next/link";
import { incrementaThumbsUp, postComment } from "@/actions";
import { ThumbsUpButton } from "./ThumbsUpButton";
import { ModalComment } from "../ModalComment";

export const CardPost = ({ post, highlight }) => {
  const submitThumbsUp = incrementaThumbsUp.bind(null, post);
  const submitComment = postComment.bind(null, post);

  return (
    <article
      className={styles.article}
      style={{ width: highlight === true ? 993 : 486 }}
    >
      <header className={styles.header}>
        <figure
          className={styles.figure}
          style={{ height: highlight === true ? 300 : 133 }}
        >
          <Image src={post.cover} fill alt="Capa post" />
        </figure>
      </header>
      <section className={styles.section}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        {highlight === false && (
          <Link href={`/posts/${post.slug}`} className={styles.link}>
            Ver detalhes
          </Link>
        )}
      </section>
      <footer className={styles.footer}>
        <div className={styles.likesComment}>
          <form action={submitThumbsUp}>
            <ThumbsUpButton />
            <p>{post.likes}</p>
          </form>
          <div>
            <ModalComment action={submitComment}/>
            <p>
              {post.comments.length}
            </p>
          </div>
        </div>
        <Avatar imageSrc={post.author.avatar} name={post.author.username} />
      </footer>
    </article>
  );
};
