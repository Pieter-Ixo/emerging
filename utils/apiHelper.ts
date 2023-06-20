import { BlocksyncUrl } from "@/constants/chains";
import { create } from "apisauce";

export const api = create({ baseURL: BlocksyncUrl });

export const getAdditionalInfo = async (url: string) => {
  const res = await api.get(url);
  if (res.problem) {
    console.error(res.problem);
    throw res.problem;
  }
  return res.data;
};
