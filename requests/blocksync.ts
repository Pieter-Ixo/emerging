import { create } from "apisauce";

import { BlocksyncUrl } from "@/constants/chains";
import { IBatch } from "@/types/certificates";

export const blocksynkAPI = create({ baseURL: BlocksyncUrl });

export async function requestBlocksyncAPI<ReturnType>(
  url: string
): Promise<ReturnType | undefined> {
  const { data, problem } = await blocksynkAPI.get<ReturnType>(url);
  if (problem) throw problem;
  return data;
}

export async function requestBatches(): Promise<IBatch[] | undefined> {
  const url = "/api/token/name/CARBON";
  const { data, problem } = await blocksynkAPI.get<IBatch[]>(url);
  if (problem) throw problem;
  return data;
}
