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
import { ITransaction } from "@/types/transaction";

export const blocksynkAPI = create({ baseURL: BlocksyncUrl });
export const blocksynkGqlUrl = `https://devnet-blocksync-new.ixo.earth/graphql`;

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
): Promise<IEntity> {
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
  const { data, problem } = await blocksynkAPI.get<IEntityTransactionResponse>(
    url
  );
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
  entityAddress: string
): Promise<IAddressBatchResponse | undefined> {
  const url = `/api/token/byAddress/${entityAddress}`;

  console.log(url);
  const { data, problem } = await blocksynkAPI.get<IAddressBatchResponse>(url);

  if (!problem && data) return data;

  throw new Error("no batches for this admin address");
}

export async function requestTransactionByHash(
  hash: string
): Promise<ITransaction | undefined> {
  try {
    const response = await fetch(blocksynkGqlUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `query Transaction {
          transaction(
              hash: "${hash}"
          ) {
              nodeId
              hash
              time
              gasWanted
              gasUsed
              fee
              code
              height
          }
      }
    `,
      }),
    });
    const transaction = await response.json();
    console.log("transaction: ", transaction);
    if (transaction.errors) throw transaction.errors;
    else return transaction.data;
  } catch (error) {
    return {
      "@type": "/ixo.token.v1beta1.MsgRetireToken",
      owner: "ixo1xwn45d6xhe3egcz3nqlfc2elpc3h6usy6yw3uk",
      tokens: [
        {
          id: "f3f21a38abee960ebb96c3780149e411",
          amount: "79",
        },
        {
          id: "7039c1eb4e0471559f5adee1a156b35c",
          amount: "328",
        },
        {
          id: "1f4af07ef744f32a1d8eadaf2f4be81a",
          amount: "328",
        },
        {
          id: "535434307deebff4a62fbafec053cd46",
          amount: "328",
        },
        {
          id: "bae604380508f9a1b1fd4d957c7b8543",
          amount: "328",
        },
        {
          id: "c4326b3d01014b15126a20ebeac75061",
          amount: "328",
        },
        {
          id: "d851779686257fbccb950c97433cfae0",
          amount: "328",
        },
        {
          id: "6972af0c52cdc57c2e5126d86517e4d4",
          amount: "328",
        },
        {
          id: "6db178dc259f04e08d67eec1fca5c9e4",
          amount: "328",
        },
        {
          id: "ab4ad7065b4a353bd5b98b44fd378721",
          amount: "328",
        },
        {
          id: "80e3e6719e596ce4812083354745378c",
          amount: "328",
        },
        {
          id: "0bc28822f56fd0ac0173c231d3e6e283",
          amount: "328",
        },
        {
          id: "76db0f4c79a4e22a3385eb1ff6194d30",
          amount: "328",
        },
        {
          id: "05820076f2c95b6f5116b1ba51e17532",
          amount: "328",
        },
        {
          id: "d3efbe0526b0e577e0fddb805afc1647",
          amount: "328",
        },
        {
          id: "3253f3fd4e9cfe5b580ed99479839661",
          amount: "328",
        },
      ],
      jurisdiction: "SE",
      reason: "Test",
    };
  }
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
