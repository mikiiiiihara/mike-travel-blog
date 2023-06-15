import Link from "next/link";
import styles from "./pagination.module.scss";

interface Props {
  totalCount: number;
  id: number;
}

export const Pagination: React.FC<Props> = ({ totalCount, id }) => {
  const PER_PAGE = 2;
  console.log(typeof id);

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index} className={styles.item}>
          {id === number ? (
            number
          ) : (
            <div className={styles.itemLink}>
              <Link href={`/blog/page/${number}`}>{number}</Link>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
