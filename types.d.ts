import { type } from "os";

type GraphQLData = {
  cursor: string;
  node: {
    author: { bio: string; name: string; id: string; photo: string[] };
    categories: [{ name: string; slug: string }];
    createdAt: string;
    excerpt: string;
    featuredImage: {
      url: string;
    };
    slug: string;
    title: string;
  };
};

type specificBlog = {
  author: { bio: string; name: string; id: string; photo: { url: string } };
  categories: [{ name: string; slug: string }];
  createdAt: string;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  slug: string;
  title: string;
  content: {
    raw: {
      children: [
        { type: string; children: [{ text: string }] },
        { type: string; children: [{ text: string }] },
        { type: string; children: [{ text: string }] },
        { type: string; children: [{ text: string }] },
        { type: string; children: [{ text: string }] },
        { type: string; children: [{ text: string }] },
        { type: string; children: [{ text: string }] }
      ];
    };
  };
};

type Blogs = {
  createdAt: string;
  featuredImage: { url: string };
  slug: string;
  title: string;
  excerpt: string;
};

type Categories = {
  name: string;
  slug: string;
};

type IComments = {
  comment: string;
  createdAt: string;
  name: string;
};

type IPostComments = {
  name: string;
  email: string;
  comment: string;
  slug: string | undefined;
};
