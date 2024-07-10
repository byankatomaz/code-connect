import logger from "@/logger";
import styles from "./page.module.css";
import { remark } from "remark";
import html from "remark-html";
import { CardPost } from "@/components/CardPost";
import db from "../../../../prisma/db";
import { redirect } from "next/navigation";

async function getPostsBySlug(slug) {
  try {
    const post = await db.post.findFirst({
      where: {
        slug,
      },
      include: {
        author: true,
      },
    });

    if(!post){
      throw new Error(`Post com o slug ${slug} não encontrado`)
    }

    const processedContent = await remark().use(html).process(post.markdown);
    const contentHtml = processedContent.toString();

    post.markdown = contentHtml;

    return post;
  } catch (error) {
    logger.error("Falha ao obter o post com o slug: ", slug, error)
  }
  redirect('/not-found')
}

const PagePost = async ({ params }) => {
  const post = await getPostsBySlug(params.slug);

  return (
    <div>
      <CardPost post={post} highlight={true} />
      <h3 className={styles.subtitle}>Código:</h3>
      <div
        className={styles.code}
        dangerouslySetInnerHTML={{ __html: post.markdown }}
      />
    </div>
  );
};

export default PagePost;
