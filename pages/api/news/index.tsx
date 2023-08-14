import { NextApiRequest, NextApiResponse } from "next";
import { create } from "apisauce";
import { INewsPostsResponse } from "@/types/news";
import { IResponseError } from "@/types/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<INewsPostsResponse | IResponseError>
) {
  const { limit, fields } = req.query;

  if (req.method === "GET") {
    try {
      const api = create({ baseURL: "https://api.github.com" });

      api.setBaseURL(`https://ixoworld.ghost.io/ghost/api/v3`);

      api.setHeaders({
        accept: "application/json",
        "Content-Type": "application/json",
      });

      const { data, problem } = await api.get<INewsPostsResponse>(
        `/content/posts?key=${process.env.GHOST_CONTENT_API_KEY}&limit=${limit}&fields=${fields}`
      );

      if (problem || !data) {
        // eslint-disable-next-line no-console
        console.error("error", problem);
        return problem;
      }
      // @ts-ignore
      return res.status(200).json(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      return res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }
}
