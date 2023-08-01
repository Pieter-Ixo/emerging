/* eslint-disable no-param-reassign */
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  requestCollections,
  requestCollectionsByOwnerAddress,
  requestEntityByExternalID,
  requestTotalCollectionEntitiesCarbon,
  requestTotalCollectionEntitiesRetired,
} from "@/requests/blocksync";
import requestUsersToken, {
  requestTokenByAddress,
} from "@/requests/requesters/getEntityToken";
import {
  IApiCollectionEntitiesTotal,
  IApiCollectionEntitiesTotalRetired,
  ICollectionEntities,
  IEntityExtended,
  ITokenWhateverItMean,
} from "@/types/entityCollections";
import fillCollection from "@/helpers/fillCollection";
import fillEntity from "@/helpers/fillEntity";

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
  async (): Promise<ICollectionEntities[]> => {
    const collectionsResponse = await requestCollections();

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
