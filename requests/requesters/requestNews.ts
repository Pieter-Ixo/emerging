import request from "@/requests/request";
import { INewsPostsResponse, INewsPostsResponseExtended } from "@/types/news";

const API_KEY = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY;

export async function requestLastNewsPost(): Promise<
  INewsPostsResponse | undefined
> {
  return request<INewsPostsResponse>(
    `https://ixoworld.ghost.io/ghost/api/v3/content/posts?key=${API_KEY}&limit=${1}&fields=title,feature_image,published_at`
  );
}
// TODO: make pagination (accept params with limit and page) using intersection hook (mantine)
export async function requestNewsPosts(): Promise<
  INewsPostsResponseExtended | undefined
> {
  return request<INewsPostsResponseExtended>(
    `https://ixoworld.ghost.io/ghost/api/v3/content/posts?key=${API_KEY}&limit=${3}&fields=title,feature_image,published_at,excerpt,id`
  );
}
