/* eslint-disable no-param-reassign */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { requestBlocksyncAPI } from "@/requests/request";
import getCollectionProfile from "@/helpers/getCollectionProfile";

import {
  IApiEntityCollectionsResponse,
  ICollectionEntities,
} from "@/types/entityCollections";
import getCollectionTags from "@/helpers/getCollectionTags";

// eslint-disable-next-line import/prefer-default-export
export const fetchAndFillCollections = createAsyncThunk(
  "entityCollections/fetchAndFillCollections",
  async (): Promise<ICollectionEntities[]> => {
    const collectionsResponse =
      await requestBlocksyncAPI<IApiEntityCollectionsResponse>(
        "/api/entity/collections"
      );

    if (!collectionsResponse) throw new Error("panica!");

    const getCollectionProfilePromises = collectionsResponse?.map(
      async (entityCollection): Promise<ICollectionEntities> => {
        const profileData = await getCollectionProfile(
          entityCollection.collection
        );
        const tagData = await getCollectionTags(entityCollection.collection);
        entityCollection.collection._profile = profileData;
        entityCollection.collection._tags = tagData;
        return entityCollection;
      }
    );
    const newCollections = await Promise.all(getCollectionProfilePromises);
    return newCollections;
  }
);
