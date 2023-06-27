import React from "react";
import Link from "next/link";
import styles from "./footer.module.scss";

const FooterComponent = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.bottomContent}>
        <Link href="/terms/contact">お問い合わせ</Link>
        <br />
        <Link href="/terms/privacy-policy">プライバシーポリシー</Link>
        <p>© 2023 Mike Travel Blog</p>
      </div>
    </div>
  );
};

FooterComponent.displayName = "Footer";
export const Footer = React.memo(FooterComponent);
