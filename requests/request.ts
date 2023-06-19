import { BlocksyncUrl } from "@/constants/chains";
import { create } from "apisauce";

export const blocksynkAPI = create({ baseURL: BlocksyncUrl });

export async function requestBlocksyncAPI<ReturnType>(
  url: string
): Promise<ReturnType | undefined> {
  const { data, problem } = await blocksynkAPI.get<ReturnType>(url);
  if (problem) throw problem;
  return data;
}

export async function request<ReturnType>(
  url: string
): Promise<ReturnType | undefined> {
  const response = await fetch(url, { method: "GET" });
  const data = (await response.json()) as ReturnType;

  return data;
}
