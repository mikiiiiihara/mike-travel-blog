import { client } from "../libs/client";
import styles from "../styles/Home.module.scss";
import { Blog } from "../types.ts/blog";
import Link from "next/link";

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
          </Link>
        </li>
      ))}
    </div>
  );
};

export default Home;
