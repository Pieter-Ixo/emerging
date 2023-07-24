/* eslint-disable no-param-reassign */
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  requestCollections,
  requestCollectionsByOwnerAddress,
  requestEntitiesByOwnerAddress,
  requestEntityByExternalID,
} from "@/requests/blocksync";
import requestUsersToken from "@/requests/requesters/getEntityToken";
import {
  ICollectionEntities,
  IEntityExtended,
  ITokenWhateverItMean,
} from "@/types/entityCollections";
import fillCollection from "@/helpers/fillCollection";
import fillEntity from "@/helpers/fillEntity";

export const fetchAndFillCollections = createAsyncThunk(
  "entityCollections/fetchAndFillCollections",
  async (): Promise<(ICollectionEntities | undefined)[]> => {
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

export const fetchEntitiesByOwnerAddressAndFill = createAsyncThunk(
  "entityCollections/fetchEntitiesByOwnerAddressAndFill",
  async (owner: string): Promise<IEntityExtended[]> => {
    const entities = await requestEntitiesByOwnerAddress(owner);
    return entities.filter((entity) => entity.type === "asset/device");
  }
);

export const fetchUsersTokens = createAsyncThunk(
  "entityCollections/fetchUsersTokens",
  async (entityOwner: string): Promise<ITokenWhateverItMean | undefined> => {
    const tokenData = await requestUsersToken(entityOwner);
    return tokenData;
  }
);
