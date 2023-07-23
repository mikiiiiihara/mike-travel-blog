import { client } from "../../libs/client";
import { Blog, Tag } from "../../types/blog";
import { Post } from "../../components/post";
import { Menu } from "../../components/menu";
import Head from "next/head";
import { COMMON_DESCRIPTION } from "../../constants/constants";

// SSG
// microCMSへAPIリクエスト
export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;
  const blog = await client.get({ endpoint: "blog", contentId: id });
  const tag = await client.get({ endpoint: "tag" });
  return {
    props: {
      blog,
      tags: tag.contents,
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
  tags: Tag[];
};

const Home: React.FC<Props> = ({ blog, tags }) => {
  return (
    <div className="wrapper">
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={COMMON_DESCRIPTION} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes"
        />
        <meta property="og:image" content={blog.thumbnail.url} />
        <meta
          name="twitter:image"
          content={`https://mike-travel-blog.com/${blog.thumbnail.url}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image:width" content={"1280"} />
        <meta property="og:image:height" content={"640"} />
        <link rel="icon" href="/me.jpg" />
      </Head>
      <Post blog={blog} /> <Menu tags={tags} />
    </div>
  );
};

export default Home;
