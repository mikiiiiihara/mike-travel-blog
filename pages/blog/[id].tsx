import { client } from "../../libs/client";
import { Blog, Tag } from "../../types.ts/blog";
import { Post } from "../../components/post";
import { Menu } from "../../components/menu";

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
    <>
      <Post blog={blog} /> <Menu tags={tags} />
    </>
  );
};

export default Home;
