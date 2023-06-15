import { client } from "../libs/client";
import styles from "../styles/Home.module.scss";
import { Blog, Tag } from "../types.ts/blog";
import Link from "next/link";
import Image from "next/image";
import { TagItem } from "../components/tag";

// SSG
// microCMSへAPIリクエスト
export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: "blog" });
  const tag = await client.get({ endpoint: "tag" });
  return {
    props: {
      blogs: blog.contents,
      tags: tag.contents,
    },
  };
};

// Props（blogsとtags）の型
type Props = {
  blogs: Blog[];
  tags: Tag[];
};

const Home: React.FC<Props> = ({ blogs, tags }) => {
  return (
    <>
      <h1>Mike Travel Blog</h1>
      <div className={styles.blogs}>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`blog/${blog.id}`}>
              <h2>{blog.title}</h2>
            </Link>
            <div className={styles.imageWrapper}>
              <Image
                src={blog.thumbnail.url}
                width={1000} // 元の画像の実際の幅を指定
                height={500} // 元の画像の実際の高さを指定
                priority
                style={{ position: "relative" }}
                alt="thumbnail"
              />
            </div>
            {blog.tags.map((tag) => (
              <TagItem name={tag.tag} key={tag.id} />
            ))}
          </li>
        ))}
      </div>
      <div className={styles.tags}>
        <h2>タグ一覧</h2>
        {tags.map((tag) => (
          <TagItem name={tag.tag} key={tag.id} />
        ))}
      </div>
    </>
  );
};

export default Home;
