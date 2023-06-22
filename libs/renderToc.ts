import * as cheerio from "cheerio";

export const renderToc = (body: string) => {
  const $ = cheerio.load(body);
  const headings = $("h1, h2, h3").toArray();
  let toc: { text: string; id: string; tagName: string }[] = [];
  headings.forEach((data) => {
    const textNode = data.children[0];
    if (textNode.type === "text") {
      toc.push({
        text: textNode.data,
        id: data.attribs.id,
        tagName: data.name, // 追加
      });
    }
  });
  return toc;
};
