import { create } from "apisauce";

import { BlocksyncUrl } from "@/constants/chains";
import {
  IApiEntityCollectionsResponse,
  ICollection,
} from "@/types/entityCollections";

const blocksynkAPI = create({ baseURL: BlocksyncUrl });

type IApiResponse<ReturnType> = Promise<{
  data?: ReturnType;
  error?: Error;
}>;

async function BlocksyncAPI<ReturnType>(url: string): IApiResponse<ReturnType> {
  const { data, problem } = await blocksynkAPI.get<ReturnType>(url);
  if (problem) return { error: new Error(problem) };
  return { data, error: undefined };
}

export async function requestGlobalCollections(): Promise<
  IApiResponse<ICollection[]>
> {
  const { data, error } = await BlocksyncAPI<IApiEntityCollectionsResponse>(
    "/api/entity/collections"
  );
  const collections = data?.map(
    (entityCollection) => entityCollection.collection
  );

  return { data: collections, error };
}

export default {};
