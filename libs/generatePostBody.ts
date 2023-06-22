import { HTML, RichEditor } from "../types.ts/blog";

// richEditor、HTMLを合体してhtml文字列を作成する。
export const generatePostBody = (body: (RichEditor | HTML)[]) => {
  return body
    .map((item) => {
      if ("richEditor" in item) {
        return item.richEditor;
      }
      if ("html" in item) {
        return item.html;
      }
      return "";
    })
    .join("");
};
