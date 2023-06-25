import React from "react";
import Link from "next/link";
import styles from "./footer.module.scss";
import { AD_CONTENT_FOOTER } from "../../constants/constants";
import parse from "html-react-parser";

const FooterComponent = () => {
  return (
    <div className={styles.footer}>
      {parse(AD_CONTENT_FOOTER)}
      <br />
      <Link href="/terms/privacy-policy">プライバシーポリシー</Link>
      <p>© 2023 Mike Travel Blog</p>
    </div>
  );
};

FooterComponent.displayName = "Footer";
export const Footer = React.memo(FooterComponent);
