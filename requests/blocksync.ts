import { create } from "apisauce";

import { BlocksyncUrl } from "@/constants/chains";
import { IAddressBatchResponse, IBatch } from "@/types/certificates";
import {
  IApiCollectionEntitiesTotal,
  IApiCollectionEntitiesTotalRetired,
  IApiEntityCollectionsResponse,
  ICollectionEntities,
  IEntity,
  IEntityExtended,
} from "@/types/entityCollections";
import { IEntityTransactionResponse } from "@/types/entityCollections/transactions";

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
export async function requestCollectionById(
  id: string
): Promise<ICollectionEntities> {
  const entityCollection = await requestBlocksyncAPI<ICollectionEntities>(
    `/api/entity/collectionById/${id}`
  );
  if (!entityCollection) throw new Error("panica!");

  return entityCollection;
}

export async function requestCollectionsByOwnerAddress(
  owner: string
): Promise<ICollectionEntities[]> {
  const entityCollections = await requestBlocksyncAPI<ICollectionEntities[]>(
    `/api/entity/collectionsByOwnerAddress/${owner}`
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

export async function requestEntityByID(id: string): Promise<IEntityExtended> {
  const entity = await requestBlocksyncAPI<IEntity>(`/api/entity/byId/${id}`);
  if (!entity) throw new Error("panica!");

  return entity;
}
export async function requestEntitiesByOwnerAddress(
  owner: string
): Promise<IEntity[]> {
  const entity = await requestBlocksyncAPI<IEntity[]>(
    `/api/entity/byOwnerAddress/${owner}`
  );
  if (!entity) throw new Error("panica!");

  return entity;
}

export async function requestEntityTransactions(
  entityAdmin
): Promise<IEntityTransactionResponse | undefined> {
  const url = `/api/transactions/getLatestTransactions/${entityAdmin}`;
  const { data, problem } = await blocksynkAPI.get<IEntityTransactionResponse>(url);
  if (problem) throw problem;

  return data;
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
  if (!problem && data) return data;
  throw new Error("no batch for this id");
}

export async function requestBatchesByAddress(
  entityAdminAddress: string
): Promise<IAddressBatchResponse | undefined> {
  const url = `/api/token/byAddress/${entityAdminAddress}`;

  const { data, problem } = await blocksynkAPI.get<IAddressBatchResponse>(url);

  if (!problem && data) return data;

  throw new Error("no batches for this admin address");
}

export async function requestTotalCollectionEntitiesCarbon(
  collectionId: string
): Promise<IApiCollectionEntitiesTotal | undefined> {
  const url = `/api/token/totalForCollection/${collectionId}`;

  const { data, problem } = await blocksynkAPI.get<IApiCollectionEntitiesTotal>(
    url
  );

  if (!problem && data) return data;

  throw new Error("no batches for this admin address");
}

export async function requestTotalCollectionEntitiesRetired(): Promise<
  IApiCollectionEntitiesTotalRetired | undefined
> {
  const url = "/api/tokenclass/name/CARBON";

  const { data, problem } =
    await blocksynkAPI.get<IApiCollectionEntitiesTotalRetired>(url);

  if (!problem && data) return data;

  throw new Error("no batches for this admin address");
}
