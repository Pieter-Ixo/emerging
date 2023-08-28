/* eslint-disable no-param-reassign */
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  requestCollectionById,
  requestCollections,
  requestCollectionsByOwnerAddress,
  requestEntityByExternalID,
  requestTotalCollectionEntitiesCarbon,
  requestTotalCollectionEntitiesRetired,
} from "@/requests/blocksync";
import requestUsersToken, {
  requestTokenByAddress,
  requestTotalTokenByAddress,
} from "@/requests/requesters/requestEntityToken";
import {
  IApiCollectionEntitiesTotal,
  IApiCollectionEntitiesTotalRetired,
  ICollectionEntities,
  ICollectionExtended,
  ICollectionTokenIpfs,
  IEntityExtended,
  ITokenWhateverItMean,
} from "@/types/entityCollections";
import fillCollection from "@/helpers/fillCollection";
import fillEntity from "@/helpers/fillEntity";
import { INewsPostsResponse, INewsPostsResponseExtended } from "@/types/news";

import {
  requestLastNewsPost,
  requestNewsPosts,
} from "@/requests/requesters/requestNews";
import requestCollectionTokenIpfs from "@/requests/requesters/requestCollectionTokenIpfs";
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
  async (
    collectionId: string,
    { getState }
  ): Promise<ICollectionEntities | undefined> => {
    const state = getState() as RootState;

    // TODO: Filling with adminTokens should be moved to new thunk
    const isCollectionsFetched =
      !!state.entityCollection.entityCollections[0]?.collection &&
      !!state.entityCollection.entityCollections[0]?.entities[0]._adminToken;

    if (isCollectionsFetched)
      return state.entityCollection.entityCollections.find(
        ({ collection }) => collection.id === collectionId
      );

    const collectionResponse: ICollectionEntities = await requestCollectionById(
      collectionId
    );

    const filledCollection = await fillCollection(
      collectionResponse.collection
    );

    const newCollection: ICollectionEntities = {
      ...collectionResponse,
      collection: filledCollection,
    };

    /* TODO:  These requests get all the ENTITY_BATCHES_TOTAL for the collection
         entities and they must be placed inside every
         entityCollection.entityCollections[0].entities[0]._adminToken,
         then you can get all ENTITY_BATCHES_TOTAL/{ENTITY_ADMIN}.amount and
         ENTITY_BATCHES_TOTAL/{ENTITY_ADMIN}.minted for second and third table columns
         These requests still should be
         swapped with backend implementation ;)
      */
    const getCollectionsEntitiesBatchesTotalPromises = await Promise.allSettled(
      collectionResponse.entities.map(
        async ({ accounts }): Promise<ITokenWhateverItMean | undefined> => {
          const entityAdmin = accounts.find(
            (acc) => acc.name === "admin"
          )?.address;

          if (entityAdmin) {
            const totalToken = await requestTotalTokenByAddress(entityAdmin);

            return totalToken;
          }

          return undefined;
        }
      )
    );

    // Convert every fulfilled batch promise to the data
    const entitiesTokens = getCollectionsEntitiesBatchesTotalPromises.map(
      (token) => (token.status === "fulfilled" ? token.value : undefined)
    );

    return {
      ...newCollection,
      entities: newCollection.entities.map((entity, entityIndex) => ({
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

export const fetchUsersTokens = createAsyncThunk(
  "entityCollections/fetchUsersTokens",
  async (entityOwner: string): Promise<ITokenWhateverItMean | undefined> => {
    const tokenData = await requestUsersToken(entityOwner);
    return tokenData;
  }
);
export const fetchAdminTokens = createAsyncThunk(
  "entityCollections/fetchAdminTokens",
  async (adminAddress: string): Promise<ITokenWhateverItMean | undefined> => {
    const tokenData = await requestTokenByAddress(adminAddress);
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
