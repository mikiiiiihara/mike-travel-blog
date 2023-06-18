import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../libs/client";

export const getSearchBlogs = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // 検索したいキーワードをqueryから取得
  const keyword = req.query.keyword;

  if (typeof keyword != "string")
    return res.status(200).json("検索ワードが不適切 or 指定されていません。");
  // 検索キーワードを設定した状態でmicroCMSにリクエストを送信。
  const response = await client.get({
    endpoint: "blog",
    queries: {
      q: decodeURI(keyword),
    },
  });
  return res.status(200).json(response);
};

export default getSearchBlogs;
