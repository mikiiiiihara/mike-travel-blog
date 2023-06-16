import React from "react";
import Link from "next/link";
import styles from "./tag.module.scss";

type Props = {
  name: string;
  id?: string;
};
const TagComponent: React.FC<Props> = ({ name, id }) => {
  return (
    <>
      {id ? (
        <Link href={`/blog/tag/${id}`} className={styles.tag}>
          {name}
        </Link>
      ) : (
        <div className={styles.tag}>{name}</div>
      )}
    </>
  );
};

TagComponent.displayName = "TagItem";
export const TagItem = React.memo(TagComponent);
