import { client } from "../libs/client";
import styles from "../styles/Home.module.scss";
import { Blog, Tag } from "../types.ts/blog";
import Link from "next/link";
import Image from "next/image";
import { TagItem } from "../components/tag";
import { useState } from "react";

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
  const [showBlogs, setShowBlogs] = useState(blogs);
  // タグ絞り込み
  const selectTag = (tag: string) => {
    if (tag === "all") {
      setShowBlogs(blogs);
    } else {
      const selectedBlogs = blogs.filter((blog) => {
        const haveTags = blog.tags.map((tag) => tag.tag);
        return haveTags.includes(tag);
      });
      setShowBlogs(selectedBlogs);
    }

    // 画面最上部へスクロールさせる
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
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
      <div>
        <h2>ピックアップ記事</h2>
      </div>
      <div className={styles.blogs}>
        {!showBlogs.length && <p>投稿がありません。</p>}
        {showBlogs.map((blog) => (
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
      </div>
      <div className={styles.footer}>
        <div>
          <h2>タグ一覧</h2>
          <p onClick={() => selectTag("all")}>ホーム</p>
          {tags.map((tag) => (
            <TagItem
              name={tag.tag}
              key={tag.id}
              onClick={() => selectTag(tag.tag)}
            />
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
