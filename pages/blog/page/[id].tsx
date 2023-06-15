import Link from "next/link";
import Image from "next/image";
import styles from "../../../styles/Home.module.scss";
import { client } from "../../../libs/client";
import { Blog, Tag } from "../../../types.ts/blog";
import { Pagination } from "../../../components/pagination";
import { TagItem } from "../../../components/tag";
import { PER_PAGE } from "../../../constants/constants";

// 動的なページを作成
export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/blog/page/${repo}`
  );

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context: { params: { id: number } }) => {
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blog",
    queries: { offset: (id - 1) * PER_PAGE, limit: PER_PAGE },
  });
  const tag = await client.get({ endpoint: "tag" });
  return {
    props: {
      blogs: data.contents,
      tags: tag.contents,
      totalCount: data.totalCount,
      id: Number(id),
    },
  };
};

// Props（blogsとtags）の型
type Props = {
  blogs: Blog[];
  tags: Tag[];
  totalCount: number;
  id: number;
};

const BlogPageId: React.FC<Props> = ({ blogs, tags, totalCount, id }) => {
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
            <Link href={`../../blog/${blog.id}`}>
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
        <Pagination totalCount={totalCount} id={id} />
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

export default BlogPageId;
