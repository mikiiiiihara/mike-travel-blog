import React from "react";
import Link from "next/link";
import styles from "./post.module.scss";
import { TagItem } from "../tag-item";
import { Blog } from "../../types.ts/blog";

type Props = {
  blog: Blog;
};
const PostComponent: React.FC<Props> = ({ blog }) => {
  return (
    <div className={styles.post}>
      <h2 className={styles.title}>{blog.title}</h2>
      <p className={styles.publishAt}>{blog.publishAt}</p>
      <TagItem name={blog.tag.tag} key={blog.tag.id} />
      <div
        dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
        className={styles.content}
      ></div>
    </div>
  );
};

PostComponent.displayName = "Post";
export const Post = React.memo(PostComponent);
