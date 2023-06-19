import React from "react";
import styles from "./post.module.scss";
import Image from "next/image";
import { TagItem } from "../tag-item";
import { Blog } from "../../types.ts/blog";
import { format } from "date-fns";
import parse from "html-react-parser";

type Props = {
  blog: Blog;
};

// リッチテキスト内にリンクが埋め込まれていた場合、変換してあげる。
const replaceLtWithAngleBracket = (input: string) => {
  let replaced = input.replace(/&lt;/g, "<");
  replaced = replaced.replace(/&gt;/g, ">");
  replaced = replaced.replace(/&quot;/g, '"');
  return replaced;
};

const PostComponent: React.FC<Props> = ({ blog }) => {
  // html-entitiesを使用してHTMLエンティティをデコードする
  const decodedString = replaceLtWithAngleBracket(blog.body);
  return (
    <div className={styles.post}>
      <h2 className={styles.title}>{blog.title}</h2>
      <p className={styles.publishAt}>
        {format(new Date(blog.publishedAt), "yyyy/MM/dd")}
      </p>
      <div className={styles.imageWrapper}>
        <div className={styles.displayTag}>
          <TagItem name={blog.tag.tag} id={blog.tag.id} key={blog.tag.id} />
        </div>
        <Image
          src={blog.thumbnail.url}
          width={1000} // 元の画像の実際の幅を指定
          height={500} // 元の画像の実際の高さを指定
          priority
          style={{ position: "relative" }}
          alt="thumbnail"
        />
      </div>
      <div className={styles.content}>{parse(decodedString)}</div>
      <div className={styles.content}>{parse(blog.advertisement || "")}</div>
    </div>
  );
};

PostComponent.displayName = "Post";
export const Post = React.memo(PostComponent);
