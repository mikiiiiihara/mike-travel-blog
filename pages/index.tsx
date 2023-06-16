import { client } from "../libs/client";
import { Blog, Tag } from "../types.ts/blog";
import { PER_PAGE } from "../constants/constants";
import { Menu } from "../components/menu";
import { Blogs } from "../components/blogs";

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

// TODO: tagページ作る
// TODO: パンくずリスト表示してあげる
const Home: React.FC<Props> = ({ blogs, tags, totalCount }) => {
  return (
    <div className="wrapper">
      <Blogs blogs={blogs} totalCount={totalCount} currentPageId={1} />
      <Menu tags={tags} />
    </div>
  );
};

export default Home;
