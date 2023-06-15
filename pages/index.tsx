import { client } from "../libs/client";
import styles from "../styles/Home.module.scss";
import { Blog, Tag } from "../types.ts/blog";
import Link from "next/link";
import Image from "next/image";
import { TagItem } from "../components/tag";
import { Pagination } from "../components/pagination";
import { PER_PAGE } from "../constants/constants";

// SSG
// microCMSへAPIリクエスト
export const getStaticProps = async () => {
  const blog = await client.get({
    endpoint: "blog",
    queries: { offset: 0, limit: PER_PAGE },
  });
  const tag = await client.get({ endpoint: "tag" });
  return {
    props: {
      blogs: blog.contents,
      tags: tag.contents,
      totalCount: blog.totalCount,
    },
  };
};

// Props（blogsとtags）の型
type Props = {
  blogs: Blog[];
  tags: Tag[];
  totalCount: number;
};

const Home: React.FC<Props> = ({ blogs, tags, totalCount }) => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.imageWrapper}>
          <Image
            src="/header.png"
            width={820} // 元の画像の実際の幅を指定
            height={200} // 元の画像の実際の高さを指定
            priority
            style={{ position: "relative" }}
            alt="header"
          />
        </div>
      </div>
      <div className={styles.blogs}>
        {!blogs.length && <p>投稿がありません。</p>}
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`blog/${blog.id}`}>
              <h2>{blog.title}</h2>
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
            </Link>
            {blog.tags.map((tag) => (
              <TagItem name={tag.tag} key={tag.id} />
            ))}
          </li>
        ))}
        <Pagination totalCount={totalCount} id={1} />
      </div>
      <div className={styles.footer}>
        <div>
          <h2>タグ一覧</h2>
          {tags.map((tag) => (
            <TagItem name={tag.tag} key={tag.id} />
          ))}
        </div>
        <div>
          <h2>プロフィール</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
