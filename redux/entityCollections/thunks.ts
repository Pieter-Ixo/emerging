/* eslint-disable no-param-reassign */
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  requestCollectionById,
  requestCollections,
  requestCollectionsByOwnerAddress,
  requestEntityByExternalID,
  requestEntityTransactions,
  requestTotalCollectionEntitiesCarbon,
  requestTotalCollectionEntitiesRetired,
} from "@/requests/blocksync";
import requestUsersTokensAndTotal, {
  requestTokenByAddress,
  requestTotalTokenByAddress,
} from "@/requests/requesters/requestEntityToken";
import {
  IApiCollectionEntitiesTotal,
  IApiCollectionEntitiesTotalRetired,
  ICarbonTokens,
  ICarbonsTokenExtended,
  ICollectionEntities,
  ICollectionExtended,
  ICollectionTokenIpfs,
  IEntityExtended,
} from "@/types/entityCollections";
import fillCollection from "@/helpers/fillCollection";
import fillEntity from "@/helpers/fillEntity";
import { INewsPostsResponse, INewsPostsResponseExtended } from "@/types/news";

import {
  requestLastNewsPost,
  requestNewsPosts,
} from "@/requests/requesters/requestNews";
import requestCollectionTokenIpfs from "@/requests/requesters/requestCollectionTokenIpfs";
import getEntityAdmin from "@/helpers/transformData/getEntityAdmin";
import { IEntityTransactionResponse } from "@/types/entityCollections/transactions";
import type { RootState } from "../store";

export const fetchTotalCollectionEntities = createAsyncThunk<any, string>(
  "entityCollections/fetchTotalCollectionEntities",
  async (
    collectionId: string
  ): Promise<{
    totalEntities: IApiCollectionEntitiesTotal;
    totalRetired: IApiCollectionEntitiesTotalRetired;
  }> => {
    const totalEntitiesResponse = await requestTotalCollectionEntitiesCarbon(
      collectionId
    );
    const totalRetiredResponse = await requestTotalCollectionEntitiesRetired();
    if (!totalEntitiesResponse || !totalRetiredResponse)
      throw new Error("panica!");

    return {
      totalEntities: totalEntitiesResponse,
      totalRetired: totalRetiredResponse,
    };
  }
);

export const fetchTotalCollectionEntitiesRetired = createAsyncThunk<any>(
  "entityCollections/fetchTotalCollectionEntitiesRetired",
  async (): Promise<IApiCollectionEntitiesTotalRetired> => {
    const totalRetiredResponse = await requestTotalCollectionEntitiesRetired();
    if (!totalRetiredResponse) throw new Error("panica!");

    return totalRetiredResponse;
  }
);
export const fetchEntityTransactions = createAsyncThunk(
  "entityCollections/fetchEntityTransactions",
  async (
    entity: IEntityExtended
  ): Promise<IEntityTransactionResponse | undefined> => {
    const entityAdmin = getEntityAdmin(entity);

    if (entityAdmin) {
      const entityTransactions = await requestEntityTransactions(entityAdmin);
      return entityTransactions;
    }
    return undefined;
  }
);

export const fetchAndFillCollections = createAsyncThunk(
  "entityCollections/fetchAndFillCollections",
  async (_, { getState }): Promise<ICollectionEntities[]> => {
    const state = getState() as RootState;

    const isCollectionsFetched =
      !!state.entityCollection.entityCollections[0]?.collection;

    if (isCollectionsFetched) return state.entityCollection.entityCollections;

    const collectionsResponse: ICollectionEntities[] =
      await requestCollections();

    const getCollectionProfilePromises = collectionsResponse?.map(
      async (entityCollection): Promise<ICollectionEntities> => {
        const collection = await fillCollection(entityCollection.collection);
        return {
          ...entityCollection,
          collection,
        };
      }
    );

    const newCollections: ICollectionEntities[] = await Promise.all(
      getCollectionProfilePromises
    );

    return newCollections;
  }
);

export const fetchAndFillCollectionById = createAsyncThunk(
  "entityCollections/fetchAndFillCollectionById",
  async (collectionId: string): Promise<ICollectionEntities | undefined> => {
    const collectionResponse: ICollectionEntities = await requestCollectionById(
      collectionId
    );

    const filledCollection = await fillCollection(
      collectionResponse.collection
    );

    const newCollection: ICollectionEntities = {
      entities: collectionResponse.entities,
      collection: filledCollection,
    };

    return newCollection;
  }
);

export const fetchCollectionEntityBatchesTotalByAdminAccount = createAsyncThunk(
  "entityCollections/fetchCollectionEntityBatchesTotalByAdminAccount",
  async ({
    entities,
    collectionId,
  }: {
    entities: IEntityExtended[];
    collectionId: string;
  }) => {
    const isEntitiesFilled = !!entities[0]._adminToken;
    if (isEntitiesFilled)
      return {
        collectionId,
        entities,
      };
    /* TODO:  These requests get all the ENTITY_BATCHES_TOTAL for all the collection
         entities and they must be placed inside every
         entityCollection.entityCollections[0].entities[0]._adminToken,
         then you can get all ENTITY_BATCHES_TOTAL/{ENTITY_ADMIN}.amount and
         ENTITY_BATCHES_TOTAL/{ENTITY_ADMIN}.minted for second and third table columns
         These requests still need error handling and should be
         swapped with backend implementation ;)
      */
    const getCollectionsEntitiesBatchesTotalPromises = await Promise.allSettled(
      entities.map(
        async (entity): Promise<ICarbonsTokenExtended | undefined> => {
          const entityAdmin = getEntityAdmin(entity);

          if (entityAdmin) {
            const totalToken = await requestTotalTokenByAddress(entityAdmin);

            return totalToken;
          }

          return undefined;
        }
      )
    );

    // Convert every batch promise to fulfilled
    const entitiesTokens = await Promise.all(
      getCollectionsEntitiesBatchesTotalPromises.map(async (token) =>
        token.status === "fulfilled" ? token.value : undefined
      )
    );

    return {
      collectionId,
      entities: entities.map((entity, entityIndex) => ({
        ...entity,
        _adminToken: entitiesTokens[entityIndex],
      })),
    };
  }
);

export const fetchCollectionsByOwnerAddres = createAsyncThunk(
  "entityCollections/fetchCollectionsByOwnerAddres",
  async (owner: string) => {
    const collectionsResponse = await requestCollectionsByOwnerAddress(owner);

    const getCollectionProfilePromises = collectionsResponse?.map(
      async (entityCollection): Promise<ICollectionEntities> => {
        const collection = await fillCollection(entityCollection.collection);
        return {
          ...entityCollection,
          collection,
        };
      }
    );
    const newCollections = await Promise.all(getCollectionProfilePromises);

    return newCollections;
  }
);

export const fetchEntityByExternalIdAndFill = createAsyncThunk(
  "entityCollections/fetchEntityByExternalIdAndFill",
  async (externalId: string): Promise<IEntityExtended> => {
    const entity = await requestEntityByExternalID(externalId);
    if (!entity) return entity;
    const filledEntity = await fillEntity(entity);
    return filledEntity;
  }
);

export const fillEntitiesForUserCollections = createAsyncThunk(
  "entityCollections/fillEntitiesForUserCollections",
  async (
    collectionEntities: ICollectionEntities
  ): Promise<{ filledEntities: IEntityExtended[]; collectionId: string }> => {
    const {
      entities,
      collection: { id: collectionId },
    } = collectionEntities;

    const entitiesPromises = entities.map(async (entity) => {
      const filledEntity = await fillEntity(entity);
      return filledEntity;
    });
    const filledEntities = await Promise.all(entitiesPromises);

    return { filledEntities, collectionId };
  }
);

export const fetchLastNewsPost = createAsyncThunk(
  "entityCollections/fetchLastNewsPost",
  async (): Promise<INewsPostsResponse | undefined> => requestLastNewsPost()
);

export const fetchNewsPosts = createAsyncThunk(
  "entityCollections/fetchNewsPosts",
  async (
    page: number | null | undefined
  ): Promise<INewsPostsResponseExtended | undefined> => requestNewsPosts(page)
);

export const fetchUsersTokensAndTotal = createAsyncThunk(
  "entityCollections/fetchUsersTokensAndTotal",
  async (entityOwner: string): Promise<ICarbonsTokenExtended | undefined> => {
    const tokenData = await requestUsersTokensAndTotal(entityOwner);
    return tokenData;
  }
);
export const fetchUsersTotalTokens = createAsyncThunk(
  "entityCollections/fetchUsersTotalTokens",
  async (entityOwner: string): Promise<ICarbonTokens | undefined> => {
    const tokensForAllUserEntities = await requestTotalTokenByAddress(
      entityOwner
    );
    return tokensForAllUserEntities;
  }
);
export const fetchAdminTokens = createAsyncThunk(
  "entityCollections/fetchAdminTokens",
  async (adminAddress: string): Promise<ICarbonTokens | undefined> => {
    const tokenData = await requestTokenByAddress(adminAddress);
    console.log("Admin tokens: ", tokenData);
    return tokenData;
  }
);

export const fetchUsersTokens = createAsyncThunk(
  "entityCollections/fetchUsersTokens",
  async (adminAddress: string): Promise<ICarbonTokens | undefined> => {
    const tokenData = await requestTokenByAddress(adminAddress);
    console.log("User tokens: ", tokenData);

    return tokenData;
  }
);

export const fetchCollectionTokenIpfs = createAsyncThunk(
  "entityCollections/fetchCollectionTokenIpfs",
  async (
    collection: ICollectionExtended
  ): Promise<
    | { collectionTokenIpfs: ICollectionTokenIpfs; collectionId: string }
    | undefined
  > => {
    const collectionTokenIpfs = await requestCollectionTokenIpfs(collection);

    if (!collectionTokenIpfs) return undefined;

    return { collectionTokenIpfs, collectionId: collection.id };
  }
);
