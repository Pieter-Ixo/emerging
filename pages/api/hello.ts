// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { create } from "apisauce";
type Data = {
  name: string;
};

const api = create({
  baseURL: "http://localhost:3001/",
});

export async function getTable(table: string) {
  const resp = await api.get(`getAll/${table}`);
  console.log("RES", resp);
  if (!resp.problem) {
    return resp.data;
  }
}
