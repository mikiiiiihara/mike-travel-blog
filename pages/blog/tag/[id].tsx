import { client } from "../../../libs/client";
import { Blog, Tag } from "../../../types.ts/blog";
import { Menu } from "../../../components/menu";
import { Blogs } from "../../../components/blogs";

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

const TagId: React.FC<Props> = ({ blogs, tags, totalCount, id }) => {
  return (
    <>
      <Blogs blogs={blogs} totalCount={totalCount} currentPageId={id} />
      <Menu tags={tags} />
    </>
  );
};

export default TagId;
