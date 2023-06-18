import Link from "next/link";
import styles from "./pagination.module.scss";
import { PER_PAGE } from "../../constants/constants";

type Props = {
  totalCount: number;
  id: number;
};

export const Pagination: React.FC<Props> = ({ totalCount, id }) => {
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
