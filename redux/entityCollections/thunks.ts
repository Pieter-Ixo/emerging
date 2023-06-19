/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { requestBlocksyncAPI } from "@/requests/request";
import getCollectionProfile from "@/helpers/getCollectionProfile";

import {
  IApiEntityCollectionsResponse,
  ICollectionProfile,
  ICollectionEntities,
} from "@/types/entityCollections";

// eslint-disable-next-line import/no-cycle
import { selectCollections } from "./selectors";
import { RootState } from "../store";

// TODO: logic of this thunk has been repeated here in fetchAndFillCollections
export const fetchEntitiesCollections = createAsyncThunk(
  "entityCollections/fetchEntitiesCollections",
  async (): Promise<IApiEntityCollectionsResponse | undefined> => {
    const collectionsResponse =
      await requestBlocksyncAPI<IApiEntityCollectionsResponse>(
        "/api/entity/collections"
      );
    return collectionsResponse;
  }
);

// TODO: logic of this thunk has been repeated here in fetchAndFillCollections
export const fetchAllCollectionsProfiles = createAsyncThunk<
  Promise<(ICollectionProfile | undefined)[]>,
  void,
  { state: RootState }
>("entityCollections/fetchAllCollectionsProfiles", async (_, { getState }) => {
  const collections = selectCollections(getState());

  const collectionProfilesData = await Promise.all(
    collections.map(async (collection) => {
      const profileData = await getCollectionProfile(collection);

      return profileData;
    })
  );

  return collectionProfilesData;
});

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
        entityCollection.collection._profile = profileData;
        return entityCollection;
      }
    );
    const newCollections = await Promise.all(getCollectionProfilePromises);
    return newCollections;
  }
);
