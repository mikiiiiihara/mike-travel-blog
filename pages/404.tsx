import { NextPage } from "next";
import Link from "next/link";

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>ページが見つかりません。申し訳ございません。</p>
      <p>
        <Link href="/">ホームへ戻る</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
