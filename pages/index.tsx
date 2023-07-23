import { client } from "../libs/client";
import { Blog, Tag } from "../types/blog";
import { COMMON_DESCRIPTION, PER_PAGE } from "../constants/constants";
import { Menu } from "../components/menu";
import { Blogs } from "../components/blogs";
import Head from "next/head";

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

// TODO: パンくずリスト表示してあげる
const Home: React.FC<Props> = ({ blogs, tags, totalCount }) => {
  return (
    <div className="wrapper">
      <Head>
        <title>Mike Travel Blog | Home</title>
        <meta name="description" content={COMMON_DESCRIPTION} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes"
        />
        <meta
          name="twitter:image"
          content="https://mike-travel-blog.com/ogp.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="/ogp.png" />
        <meta property="og:image:width" content={"1280"} />
        <meta property="og:image:height" content={"640"} />
        <link rel="icon" href="/me.jpg" />
      </Head>
      <Blogs blogs={blogs} totalCount={totalCount} currentPageId={1} />
      <Menu tags={tags} />
    </div>
  );
};

export default Home;
