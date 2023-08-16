import request from "@/requests/request";
import { INewsPostsResponse } from "@/types/news";

const CONTENT_API_KEY = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY;

export default async function requestLastNewsPost(): Promise<
  INewsPostsResponse | undefined
> {
  return request<INewsPostsResponse>(
    `https://ixoworld.ghost.io/ghost/api/v3/content/posts?key=${CONTENT_API_KEY}&limit=${1}&fields=title,feature_image,published_at`
  );
}
