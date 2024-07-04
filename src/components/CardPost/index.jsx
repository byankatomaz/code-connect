import Image from "next/image"
import { Avatar } from "../Avatar"
import styles from './card.module.css'

export const CardPost = ({ post }) => {
    return (
        <article className={styles.article}>
            <header className={styles.header}>
                <figure className={styles.figure}>
                    <Image src={post.cover}  width={438} height={133} alt="Capa post" />
                </figure>
            </header>
            <section className={styles.section}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </section>
            <footer className={styles.footer}>
                <Avatar 
                imageSrc={post.author.avatar} 
                name={post.author.username} 
                />
            </footer>
        </article>
    )
}