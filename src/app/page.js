import styles from "./page.module.css";
import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import Link from "next/link";
import db from "../../prisma/db";

async function getAllPosts(page, searchTerm) {
  try {

    const where = {}

    if (searchTerm) {
      where.title = {
        contains: searchTerm,
        mode: 'insensitive'
      }
    }

    const perPage = 6
    const skip = (page - 1) * perPage
    const prev = page > 1 ? page - 1 : null
    const totalItems = await db.post.count({ where })
    const totalPages = Math.ceil(totalItems / perPage)
    const next = page < totalPages ? page + 1 : null

    const posts = await db.post.findMany({
      take: perPage,
      skip,
      where,
      orderBy: { id: 'desc' },
      include: {
        author: true,
        comments: true
      }
    })

    return { data: posts, prev: prev, next: next }
  } catch (error) {
    logger.error('Falha ao obter posts', { error })

    return { data: [], prev: null, next: null }
  }
}

export default async function Home({ searchParams }) {
  const currentPage = parseInt(searchParams?.page) || 1;
  const searchTerm = searchParams?.q
  const { data: posts, prev, next } = await getAllPosts(currentPage, searchTerm);

  return (
    <main>
      <div className={styles.grid}>
        {posts.map((post) => (
          <CardPost post={post} key={post.id} highlight={false} />
        ))}
      </div>

      <div className={styles.cardLink}>
        {prev && <Link className={styles.link} href={{ pathname: '/', query: { page: prev, q: searchTerm } }}>Página anterior</Link>}
        {next && <Link className={styles.link} href={{ pathname: '/', query: { page: next, q: searchTerm } }}>Próxima página</Link>}
      </div>
    </main>
  );
}
