import { client } from "../../../libs/client";
import { Blog, Tag } from "../../../types.ts/blog";
import { PER_PAGE } from "../../../constants/constants";
import { Menu } from "../../../components/menu";
import { Blogs } from "../../../components/blogs";

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
      <Blogs blogs={blogs} totalCount={totalCount} currentPageId={id} />
      <Menu tags={tags} />
    </>
  );
};

export default BlogPageId;
