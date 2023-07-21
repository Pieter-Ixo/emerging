/* eslint-disable no-param-reassign */
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  requestCollections,
  requestCollectionsByOwnerAddress,
  requestEntitiesByOwnerAddress,
  requestEntityByExternalID,
} from "@/requests/blocksync";
import requestCollectionProfile from "@/requests/requesters/getCollectionProfile";
import getCollectionTags from "@/requests/requesters/getCollectionTags";
import getCollectionTokenIpfs from "@/requests/requesters/getCollectionTokenIpfs";
import requestEntityDeviceCredential from "@/requests/requesters/getEntityDeviceCredential";
import requestEntityProfile from "@/requests/requesters/getEntityProfile";
import requestEntityTags from "@/requests/requesters/getEntityTags";
import requestEntityToken from "@/requests/requesters/getEntityToken";
import {
  ICollectionEntities,
  IEntityExtended,
} from "@/types/entityCollections";

export const fetchAndFillCollections = createAsyncThunk(
  "entityCollections/fetchAndFillCollections",
  async (): Promise<ICollectionEntities[]> => {
    const collectionsResponse = await requestCollections();

    const getCollectionProfilePromises = collectionsResponse?.map(
      async (entityCollection): Promise<ICollectionEntities> => {
        // TODO: move it to helpers

        const [profileData, tagData, tokenIpfs] = await Promise.all([
          await requestCollectionProfile(entityCollection.collection),
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

export const fetchCollectionsByOwnerAddres = createAsyncThunk(
  "entityCollections/fetchCollectionsByOwnerAddres",
  async (owner: string) => {
    const collectionsResponse = await requestCollectionsByOwnerAddress(owner);

    const getCollectionProfilePromises = collectionsResponse?.map(
      async (entityCollection): Promise<ICollectionEntities> => {
        // TODO: move it to helpers

        const [profileData, tagData, tokenIpfs] = await Promise.all([
          await requestCollectionProfile(entityCollection.collection),
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

// TODO: Let's migrate this to this file: "@/helpers/getEntityProfile"
export const fetchEntityByExternalIdAndFill = createAsyncThunk(
  "entityCollections/fetchEntityByExternalIdAndFill",
  async (externalId: string): Promise<IEntityExtended> => {
    const entity = await requestEntityByExternalID(externalId);
    if (!entity) return entity;

    const [profile, token, deviceCredential, tags] = await Promise.all([
      await requestEntityProfile(entity),
      await requestEntityToken(entity),
      await requestEntityDeviceCredential(entity),
      await requestEntityTags(entity),
      // await requestSupamoto(entity.externalId),
      // await requestSupamotoCookingSummary(entity.externalId),
    ]);

    entity._profile = profile;
    entity._token = token;
    entity._deviceCredential = deviceCredential;
    entity._tags = tags;

    return entity;
  }
);

export const fetchEntitiesByOwnerAddressAndFill = createAsyncThunk(
  "entityCollections/fetchEntitiesByOwnerAddressAndFill",
  async (owner: string): Promise<IEntityExtended[]> => {
    const entities = await requestEntitiesByOwnerAddress(owner);
    return entities.filter((entity) => entity.type === "asset/device");
  }
);
