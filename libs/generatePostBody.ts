import { Comment, Comments, HTML, RichEditor } from "../types/blog";

// richEditor、HTMLを合体してhtml文字列を作成する。
export const generatePostBody = (body: (RichEditor | HTML | Comments)[]) => {
  return body
    .map((item) => {
      if ("richEditor" in item) {
        return item.richEditor;
      }
      if ("html" in item) {
        return item.html;
      }
      if ("comments" in item) {
        return item.comments.map((comment) => gererateComment(comment));
      }
      return "";
    })
    .join("");
};

// 吹き出し箇所の見た目を作る
const gererateComment = (comment: Comment) => {
  return `<div class="comment"><div class="icon"><img src="${comment.image.url}"/><p>${comment.name}<p></div><p>${comment.body}</p></div>`;
};
