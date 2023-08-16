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
}

export interface INewsPostExtended extends INewsPost {
  excerpt: string;
  id: string;
}

export interface INewsPostsResponse {
  posts: INewsPost[];
  meta?: {
    pagination: INewsPagination | undefined;
  };
}
export interface INewsPostsResponseExtended extends INewsPostsResponse {
  posts: INewsPostExtended[];
}
