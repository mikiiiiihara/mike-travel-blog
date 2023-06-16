import React from "react";
import Link from "next/link";
import styles from "./footer.module.scss";

const FooterComponent = () => {
  return (
    <div className={styles.footer}>
      <Link href="">プライバシーポリシー</Link>
      <p>© 2023 Mike Travel Blog</p>
    </div>
  );
};

FooterComponent.displayName = "Footer";
export const Footer = React.memo(FooterComponent);
