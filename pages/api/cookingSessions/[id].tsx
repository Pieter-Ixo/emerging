import { NextApiRequest, NextApiResponse } from "next";
import { useSelector, useDispatch } from "react-redux";
import { create } from "apisauce";
import dayjs from "dayjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic" + process.env.API_KEY,
    },
  };
  const id = req.query.id;
  const startDate = dayjs("2023-01-01").format("YYYY-MM-DD");
  const endDate = dayjs(new Date()).format("YYYY-MM-DD");
  if (req.method === "GET") {
    try {
      const api = create({ baseURL: "https://api.github.com" });

      api.setBaseURL(
        `https://api.supamoto.app/api/v2/stoves/${id}/sessions/cooking?page=0&pageSize=50&startDate=${startDate}&endDate=${endDate}`
      );
      api.setHeaders({
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic" + process.env.API_KEY,
      });
      const response = await api.get("");
      if (response.problem) {
        console.log("error", response.problem);
        return response.problem;
      }
      // @ts-ignore
      res.status(200).json(response);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
