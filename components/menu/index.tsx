import React from "react";
import styles from "./menu.module.scss";
import { Tag } from "../../types.ts/blog";
import { TagItem } from "../tag-item";

type Props = {
  tags: Tag[];
};
const MenuComponent: React.FC<Props> = ({ tags }) => {
  return (
    <div className={styles.menu}>
      <div>
        <h2>タグ一覧</h2>
        {tags.map((tag) => (
          <TagItem name={tag.tag} key={tag.id} />
        ))}
      </div>
      <div>
        <h2>プロフィール</h2>
      </div>
    </div>
  );
};

MenuComponent.displayName = "Menu";
export const Menu = React.memo(MenuComponent);
