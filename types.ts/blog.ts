export type Blog = {
  id: string;
  title: string;
  body: string;
  tag: Tag;
  thumbnail: {
    url: string;
  };
  publishedAt: string;
  revisedAt: string;
  advertisement?: string;
};

export type Tag = {
  id: string;
  tag: string;
};
