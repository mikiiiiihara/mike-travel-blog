export type Blog = {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
  thumbnail: {
    url: string;
  };
  publishAt: string;
  updatedAt: string;
};

export type Tag = {
  id: string;
  tag: string;
};
