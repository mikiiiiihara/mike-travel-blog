import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./blog-card.module.scss";
import { Blog } from "../../types/blog";
import { TagItem } from "../tag-item";

type Props = {
  blog: Blog;
};
const BlogCardComponent: React.FC<Props> = ({ blog }) => {
  return (
    <>
      <div className={styles.imageWrapper}>
        <div className={styles.displayTag}>
          <TagItem name={blog.tag.tag} id={blog.tag.id} key={blog.tag.id} />
        </div>
        <Link href={`/blog/${blog.id}`}>
          <Image
            src={blog.thumbnail.url}
            width={1000} // 元の画像の実際の幅を指定
            height={500} // 元の画像の実際の高さを指定
            priority
            style={{ position: "relative" }}
            alt="thumbnail"
          />
        </Link>
      </div>
      <Link href={`/blog/${blog.id}`}>
        <h2 className={styles.title}>{blog.title}</h2>
      </Link>
    </>
  );
};

BlogCardComponent.displayName = "BlogCard";
export const BlogCard = React.memo(BlogCardComponent);
