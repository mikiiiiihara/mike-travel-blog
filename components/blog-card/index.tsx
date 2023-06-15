import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./blog-card.module.scss";
import { Blog } from "../../types.ts/blog";
import { TagItem } from "../tag-item";

type Props = {
  blog: Blog;
};
const BlogCardComponent: React.FC<Props> = ({ blog }) => {
  return (
    <>
      <Link href={`/blog/${blog.id}`}>
        <h2>{blog.title}</h2>
        <div className={styles.imageWrapper}>
          <Image
            src={blog.thumbnail.url}
            width={1000} // 元の画像の実際の幅を指定
            height={500} // 元の画像の実際の高さを指定
            priority
            style={{ position: "relative" }}
            alt="thumbnail"
          />
        </div>
      </Link>
      {blog.tags.map((tag) => (
        <TagItem name={tag.tag} key={tag.id} />
      ))}
    </>
  );
};

BlogCardComponent.displayName = "BlogCard";
export const BlogCard = React.memo(BlogCardComponent);
