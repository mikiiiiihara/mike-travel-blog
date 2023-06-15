import React from "react";
import styles from "./blogs.module.scss";
import { BlogCard } from "../blog-card";
import { Pagination } from "../pagination";
import { Blog } from "../../types.ts/blog";

type Props = {
  blogs: Blog[];
  totalCount: number;
  currentPageId: number;
};
const BlogsComponent: React.FC<Props> = ({
  blogs,
  totalCount,
  currentPageId,
}) => {
  return (
    <div className={styles.blogs}>
      {!blogs.length && <p>投稿がありません。</p>}
      {blogs.map((blog) => (
        <li key={blog.id}>
          <BlogCard blog={blog} />
        </li>
      ))}
      <Pagination totalCount={totalCount} id={currentPageId} />
    </div>
  );
};

BlogsComponent.displayName = "Blogs";
export const Blogs = React.memo(BlogsComponent);
