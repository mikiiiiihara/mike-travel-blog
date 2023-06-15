import { client } from "../libs/client";
import styles from "../styles/Home.module.scss";
import { Blog } from "../types.ts/blog";
import Link from "next/link";
import Image from "next/image";

// SSG
// microCMSへAPIリクエスト
export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: "blog" });
  return {
    props: {
      blogs: blog.contents,
    },
  };
};

// Props（blogsとtags）の型
type Props = {
  blogs: Blog[];
};

const Home: React.FC<Props> = ({ blogs }) => {
  return (
    <div className={styles.blogs}>
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
        </li>
      ))}
    </div>
  );
};

export default Home;
