import React from "react";
import styles from "./post.module.scss";
import Image from "next/image";
import { TagItem } from "../tag-item";
import { Blog } from "../../types/blog";
import { format } from "date-fns";
import parse from "html-react-parser";
import { renderToc } from "../../libs/renderToc";
import { TocContent } from "../toc-content";
import { generatePostBody } from "../../libs/generatePostBody";

type Props = {
  blog: Blog;
};

const PostComponent: React.FC<Props> = ({ blog }) => {
  const body = generatePostBody(blog.body);
  // 目次生成
  const tocs = renderToc(body);
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
      <div className={styles.content}>
        <TocContent tocs={tocs} />
      </div>
      <div className={styles.content}>{parse(body)}</div>
    </div>
  );
};

PostComponent.displayName = "Post";
export const Post = React.memo(PostComponent);
