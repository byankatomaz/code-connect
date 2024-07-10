import logger from "@/logger";
import styles from "./page.module.css";
import { remark } from "remark";
import html from "remark-html";
import { CardPost } from "@/components/CardPost";

async function getPostsBySlug(slug) {
  console.log("OLA ");
  const response = await fetch(`http://localhost:3042/posts?slug=${slug}`);

  if (!response.ok) {
    logger.error("teve um erro");
    return {};
  }
  logger.info("Posts com slug obtidos com sucesso");
  const data = await response.json();

  console.log("OLA ", data);

  if (data.length == 0) {
    return {};
  }

  const post = data[0];

  const processedContent = await remark().use(html).process(post.markdown);
  const contentHtml = processedContent.toString();

  post.markdown = contentHtml;

  return post;
}

const PagePost = async ({ params }) => {
  const post = await getPostsBySlug(params.slug);

  return (
    <div>
      <CardPost post={post} highlight={true} />
      <h3 className={styles.subtitle}>Código:</h3>
      <div className={styles.code} dangerouslySetInnerHTML={{ __html: post.markdown }} />
    </div>
  );
};

export default PagePost;
