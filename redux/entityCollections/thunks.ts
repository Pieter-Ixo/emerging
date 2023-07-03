/* eslint-disable no-param-reassign */
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  requestCollections,
  requestEntityByExternalID,
} from "@/requests/blocksync";

import getCollectionProfile from "@/helpers/getCollectionProfile";
import getCollectionTags from "@/helpers/getCollectionTags";
import getCollectionTokenIpfs from "@/helpers/getCollectionTokenIpfs";
import getEntityProfile from "@/helpers/getEntityProfile";

import {
  ICollectionEntities,
  IEntityExtended,
} from "@/types/entityCollections";
import getEntityToken from "@/helpers/getEntityToken";
import getEntityDeviceCredential from "@/helpers/getEntityDeviceCredential";

export const fetchAndFillCollections = createAsyncThunk(
  "entityCollections/fetchAndFillCollections",
  async (): Promise<ICollectionEntities[]> => {
    const collectionsResponse = await requestCollections();

    const getCollectionProfilePromises = collectionsResponse?.map(
      async (entityCollection): Promise<ICollectionEntities> => {
        const [profileData, tagData, tokenIpfs] = await Promise.all([
          await getCollectionProfile(entityCollection.collection),
          await getCollectionTags(entityCollection.collection),
          await getCollectionTokenIpfs(entityCollection.collection),
        ]);
        entityCollection.collection._profile = profileData;
        entityCollection.collection._tags = tagData;
        entityCollection.collection._tokenIpfs = tokenIpfs;
        return entityCollection;
      }
    );
    const newCollections = await Promise.all(getCollectionProfilePromises);

    return newCollections;
  }
);

export const fetchCollectionByEntity = createAsyncThunk(
  "entityCollections/fetchCollectionByEntity",
  () => {}
);

export const fetchEntityByExternalIdAndFill = createAsyncThunk(
  "entityCollections/fetchEntityByExternalIdAndFill",
  async (externalId: string): Promise<IEntityExtended> => {
    const entity = await requestEntityByExternalID(externalId);

    const [profile, token, deviceCredential] = await Promise.all([
      await getEntityProfile(entity),
      await getEntityToken(entity),
      await getEntityDeviceCredential(entity),
    ]);

    entity._profile = profile;
    entity._token = token;
    entity._deviceCredential = deviceCredential;

    return entity;
  }
);
