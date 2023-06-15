import React from "react";
import styles from "./tag.module.scss";

interface Props {
  name: string;
  onClick?: () => void;
}
const TagComponent: React.FC<Props> = ({ name, onClick }) => {
  return (
    <div className={styles.tag} onClick={onClick}>
      {name}
    </div>
  );
};

TagComponent.displayName = "SectorPanelItem";
export const TagItem = React.memo(TagComponent);
