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

export async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then((res) => res.json());
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw err;
  }
}

export function fetchTerms() {
  let terms: { Title: string; Content: string }[] = [];
  return async (type: "terms" | "privacy") => {
    if (!terms.length) {
      const res = (await getAdditionalInfo("/api/terms")) as any;
      terms = res || [];
    }
    const data = terms.find((d) =>
      type === "terms"
        ? d.Title === "Terms of Use Payment"
        : d.Title === "Privacy Policy Payment"
    ) || { Title: "", Content: "" };
    return data;
  };
}
