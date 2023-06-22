export type Blog = {
  id: string;
  title: string;
  body: (RichEditor | HTML)[];
  tag: Tag;
  thumbnail: {
    url: string;
  };
  publishedAt: string;
  revisedAt: string;
};

export type Tag = {
  id: string;
  tag: string;
};

export type RichEditor = {
  fieldId: "richEditor";
  richEditor: string;
};

export type HTML = {
  fieldId: "HTML";
  html: string;
};
