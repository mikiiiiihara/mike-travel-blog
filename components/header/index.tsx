import React from "react";
import styles from "./header.module.scss";
import Image from "next/image";
import Link from "next/link";

const HeaderComponent = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.imageWrapper}>
          <Image
            src="/header.png"
            width={820} // 元の画像の実際の幅を指定
            height={200} // 元の画像の実際の高さを指定
            priority
            style={{ position: "relative" }}
            alt="header"
          />
        </div>
      </Link>
    </div>
  );
};

HeaderComponent.displayName = "Header";
export const Header = React.memo(HeaderComponent);
