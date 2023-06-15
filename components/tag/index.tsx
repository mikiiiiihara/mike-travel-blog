import React from "react";
import styles from "./tag.module.scss";

interface Props {
  name: string;
}
const TagComponent: React.FC<Props> = ({ name }) => {
  return <div className={styles.tag}>{name}</div>;
};

TagComponent.displayName = "SectorPanelItem";
export const TagItem = React.memo(TagComponent);
