import React, { useState } from "react";
import styles from "./menu.module.scss";
import { Tag } from "../../types.ts/blog";
import { TagItem } from "../tag-item";
import Image from "next/image";

type Props = {
  tags: Tag[];
};
const MenuComponent: React.FC<Props> = ({ tags }) => {
  const [open, setOpen] = useState(false);
  const menuClass = open ? "display_block_mobile" : "display_none_mobile";
  return (
    <>
      <div className={styles.mobile}>
        <div className={styles.hamburger} onClick={() => setOpen(!open)}>
          {open ? (
            <span className={styles.closedButton}>×</span>
          ) : (
            <Image
              src="/menu_open.png"
              width={40} // 元の画像の実際の幅を指定
              height={40} // 元の画像の実際の高さを指定
              priority
              style={{ position: "relative" }}
              alt="thumbnail"
            />
          )}
        </div>
      </div>
      <div className={`${menuClass} display_inline_block_pc`}>
        <div className={styles.menu}>
          <div className={styles.displayNoneMobile}>
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
        </div>
      </div>
    </>
  );
};

MenuComponent.displayName = "Menu";
export const Menu = React.memo(MenuComponent);
