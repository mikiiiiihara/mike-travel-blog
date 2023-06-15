import { client } from "../../libs/client";
import { Blog } from "../../types.ts/blog";
import styles from "../../styles/Home.module.scss";
import Link from "next/link";
import { TagItem } from "../../components/tag";

// SSG
// microCMSへAPIリクエスト
export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;
  const blog = await client.get({ endpoint: "blog", contentId: id });
  return {
    props: {
      blog,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });
  const paths = data.contents.map(
    (content: { id: string }) => `/blog/${content.id}`
  );
  return {
    paths,
    fallback: false, // ここで存在しないidは404エラー
  };
};

// Props（blogsとtags）の型
type Props = {
  blog: Blog;
};

const Home: React.FC<Props> = ({ blog }) => {
  return (
    <div className={styles.main}>
      <Link href="/">ホームへ戻る</Link>
      <h2 className={styles.title}>{blog.title}</h2>
      <p className={styles.publishAt}>{blog.publishAt}</p>
      {blog.tags.map((tag) => (
        <TagItem name={tag.tag} key={tag.id} />
      ))}
      <div
        dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
        className={styles.post}
      ></div>
    </div>
  );
};

export default Home;
