import React from "react";
import Link from "next/link";
import styles from "./toc-content.module.scss";

type Props = {
  tocs: {
    text: string;
    id: string;
    tagName: string;
  }[];
};
const TocComponent: React.FC<Props> = ({ tocs }) => {
  const generateIndent = (tagName: string) => {
    switch (tagName) {
      case "h2":
        return "　・";
      case "h3":
        return "　　・";
      default:
        return "・";
    }
  };
  return (
    <div className={styles.topContent}>
      <h1>目次</h1>
      <ul>
        {tocs.map((toc) => (
          <li key={toc.id}>
            {generateIndent(toc.tagName)}
            <a href={`#${toc.id}`}>{toc.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

TocComponent.displayName = "TocContent";
export const TocContent = React.memo(TocComponent);
