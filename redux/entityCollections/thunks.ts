/* eslint-disable no-param-reassign */
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  requestCollections,
  requestEntityByExternalID,
} from "@/requests/blocksync";
import getCollectionProfile from "@/helpers/getCollectionProfile";
import getEntityProfile from "@/helpers/getEntityProfile";

import {
  ICollectionEntities,
  IEntityExtended,
} from "@/types/entityCollections";
import getCollectionTags from "@/helpers/getCollectionTags";

export const fetchAndFillCollections = createAsyncThunk(
  "entityCollections/fetchAndFillCollections",
  async (): Promise<ICollectionEntities[]> => {
    const collectionsResponse = await requestCollections();

    const getCollectionProfilePromises = collectionsResponse?.map(
      async (entityCollection): Promise<ICollectionEntities> => {
        const [profileData, tagData] = await Promise.all([
          await getCollectionProfile(entityCollection.collection),
          await getCollectionTags(entityCollection.collection),
        ]);
        entityCollection.collection._profile = profileData;
        entityCollection.collection._tags = tagData;
        return entityCollection;
      }
    );
    const newCollections = await Promise.all(getCollectionProfilePromises);

    return newCollections;
  }
);

export const fetchCollectionOfEntity = createAsyncThunk(
  "entityCollections/fetchCollectionOfEntity",
  () => {}
);

export const fetchEntityByExterbalIdAndFill = createAsyncThunk(
  "entityCollections/fetchEntityByExterbalIdAndFill",
  async (externalId: string): Promise<IEntityExtended> => {
    const entity = await requestEntityByExternalID(externalId);
    const profile = await getEntityProfile(entity);
    entity._profile = profile;

    return entity;
  }
);
