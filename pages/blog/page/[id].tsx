import { client } from "../../../libs/client";
import { Blog, Tag } from "../../../types/blog";
import { COMMON_DESCRIPTION, PER_PAGE } from "../../../constants/constants";
import { Menu } from "../../../components/menu";
import { Blogs } from "../../../components/blogs";
import Head from "next/head";

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
    <div className="wrapper">
      <Head>
        <title>Mike Travel Blog | {id}ページ目</title>
        <meta name="description" content={COMMON_DESCRIPTION} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes"
        />
        <meta property="og:image" content="/ogp.png" />
        <meta
          name="twitter:image"
          content="https://mike-travel-blog.com/ogp.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image:width" content={"1280"} />
        <meta property="og:image:height" content={"640"} />
        <link rel="icon" href="/me.jpg" />
      </Head>
      <Blogs blogs={blogs} totalCount={totalCount} currentPageId={id} />
      <Menu tags={tags} />
    </div>
  );
};

export default BlogPageId;
