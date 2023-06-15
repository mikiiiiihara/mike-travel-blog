import React from "react";
import styles from "./tag.module.scss";

type Props = {
  name: string;
  onClick?: () => void;
};
const TagComponent: React.FC<Props> = ({ name, onClick }) => {
  return (
    <div className={styles.tag} onClick={onClick}>
      {name}
    </div>
  );
};

TagComponent.displayName = "TagItem";
export const TagItem = React.memo(TagComponent);
