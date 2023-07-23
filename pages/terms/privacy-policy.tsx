import { client } from "../../libs/client";
import { Tag } from "../../types/blog";
import { Menu } from "../../components/menu";
import Head from "next/head";
import { PrivacyPost } from "../../components/custom-post/privacy-post";

// SSG
// microCMSへAPIリクエスト
export const getStaticProps = async () => {
  const tag = await client.get({ endpoint: "tag" });
  return {
    props: {
      tags: tag.contents,
    },
  };
};

// Propsの型
type Props = {
  tags: Tag[];
};

const PrivacyPolicy: React.FC<Props> = ({ tags }) => {
  return (
    <div className="wrapper">
      <Head>
        <title>プライバシーポリシー -Mike Travel Blog-</title>
        <meta
          name="description"
          content="Mike Travel Blogのプライバシーポリシーです。"
        />
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
      <PrivacyPost /> <Menu tags={tags} />
    </div>
  );
};

export default PrivacyPolicy;
