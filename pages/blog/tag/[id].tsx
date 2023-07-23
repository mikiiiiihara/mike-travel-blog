import { client } from "../../../libs/client";
import { Blog, Tag } from "../../../types/blog";
import { Menu } from "../../../components/menu";
import { Blogs } from "../../../components/blogs";
import Head from "next/head";
import { COMMON_DESCRIPTION } from "../../../constants/constants";

// 動的なページを作成
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "tag" });
  const paths = data.contents.map(
    (content: { id: any }) => `/blog/tag/${content.id}`
  );

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blog",
    queries: { filters: `tag[equals]${id}` },
  });
  const tag = await client.get({ endpoint: "tag" });
  const currentTag = tag.contents.find((tagItem: Tag) => tagItem.id === id);
  return {
    props: {
      blogs: data.contents,
      tags: tag.contents,
      totalCount: data.totalCount,
      id: Number(id),
      currentTagName: currentTag.tag,
    },
  };
};

// Props（blogsとtags）の型
type Props = {
  blogs: Blog[];
  tags: Tag[];
  totalCount: number;
  id: number;
  currentTagName: string;
};

const TagId: React.FC<Props> = ({
  blogs,
  tags,
  totalCount,
  id,
  currentTagName,
}) => {
  return (
    <div className="wrapper">
      <Head>
        <title>{currentTagName}</title>
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

export default TagId;
