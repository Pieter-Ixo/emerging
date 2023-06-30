import { create } from "apisauce";

import { BlocksyncUrl } from "@/constants/chains";
import { IBatch } from "@/types/certificates";
import {
  IApiEntityCollectionsResponse,
  ICollectionEntities,
  IEntity,
  IEntityExtended,
} from "@/types/entityCollections";

export const blocksynkAPI = create({ baseURL: BlocksyncUrl });

export async function requestBlocksyncAPI<ReturnType>(
  url: string
): Promise<ReturnType | undefined> {
  const { data, problem } = await blocksynkAPI.get<ReturnType>(url);
  if (problem) throw problem;
  return data;
}

export async function requestCollections(): Promise<ICollectionEntities[]> {
  const entityCollections =
    await requestBlocksyncAPI<IApiEntityCollectionsResponse>(
      "/api/entity/collections"
    );
  if (!entityCollections) throw new Error("panica!");

  return entityCollections;
}

export async function requestEntityByExternalID(
  externalId: string
): Promise<IEntityExtended> {
  const entity = await requestBlocksyncAPI<IEntity>(
    `/api/entity/byExternalId/${externalId}`
  );
  if (!entity) throw new Error("panica!");

  return entity;
}

export async function requestBatches(): Promise<IBatch[] | undefined> {
  const url = "/api/token/name/CARBON";
  const { data, problem } = await blocksynkAPI.get<IBatch[]>(url);
  if (problem) throw problem;
  return data;
}

export async function requestBatchesByEntityID(
  entityId: IEntity["id"]
): Promise<IBatch[] | undefined> {
  const url = `/api/token/entity/${entityId}`;
  const { data, problem } = await blocksynkAPI.get<IBatch[]>(url);
  if (problem) throw problem;
  return data;
}

export async function requestBatchByID(
  batchId: IBatch["id"]
): Promise<IBatch | undefined> {
  const url = `/api/token/id/${batchId}`;
  const { data, problem } = await blocksynkAPI.get<IBatch>(url);
  if (problem) throw problem;
  // return data;
  return {
    id: "998db61979e94a939cfaa635ba8c63d3",
    index: "bafkreibzfmpb5vi3dezygipylystbunhg5nbqwgdahmf4orgeemitelxae",
    name: "CARBON",
    collection: "did:ixo:entity:eb98bb2c92a62557b6c88c6f80e8d258",
    tokenData: [
      {
        aid: 191,
        uri: "https://ipfs.io/ipfs/bafkreibzfmpb5vi3dezygipylystbunhg5nbqwgdahmf4orgeemitelxae",
        encrypted: false,
        proof: "bafkreibzfmpb5vi3dezygipylystbunhg5nbqwgdahmf4orgeemitelxae",
        type: "application/json",
        id: "urn:uuid:bd7413dc-003a-4b9f-bfdf-e4cf32dd7a66",
        tokenId: "998db61979e94a939cfaa635ba8c63d3",
      },
      {
        aid: 192,
        uri: "",
        encrypted: false,
        proof: "",
        type: "application/json",
        id: "did:ixo:entity:fe10ed6f17aa11f35068b126be43a1fc",
        tokenId: "998db61979e94a939cfaa635ba8c63d3",
      },
    ],
  };
}
