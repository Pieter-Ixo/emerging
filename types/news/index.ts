interface INewsPagination {
  page: number;
  limit: number;
  pages: number;
  total: number;
  next: number | null;
  prev: number | null;
}

interface INewsPost {
  title: string;
  feature_image: string;
  published_at: string;
  excerpt: string;
}

export interface INewsPostsResponse {
  posts: INewsPost[];
  meta: {
    pagination: INewsPagination;
  };
}
