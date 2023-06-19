/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { IApiEntityCollectionsResponse } from "@/types/entityCollections";
// eslint-disable-next-line import/no-cycle
import {
  fetchAllCollectionsProfiles,
  fetchAndFillCollections,
  fetchEntitiesCollections,
} from "./thunks";

export type EntityCollectionState = {
  entityCollections: IApiEntityCollectionsResponse;
  isEntityCollectionsLoading: boolean;
};

const initialState: EntityCollectionState = {
  entityCollections: [],
  isEntityCollectionsLoading: false,
};

const EntityCollectionSlice = createSlice({
  name: "entityCollections",
  initialState,
  reducers: {
    setIsEntityCollectionsLoading: (state, action: PayloadAction<boolean>) => {
      state.isEntityCollectionsLoading = action.payload;
    },
    setEntityCollections: (
      state,
      action: PayloadAction<IApiEntityCollectionsResponse>
    ) => {
      state.entityCollections = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchEntitiesCollections.pending, (state) => {
      state.isEntityCollectionsLoading = true;
    });

    builder.addCase(fetchEntitiesCollections.fulfilled, (state, action) => {
      state.isEntityCollectionsLoading = false;
      if (action.payload) state.entityCollections = action.payload;
    });

    // TODO: do I need this builder?
    builder.addCase(fetchAllCollectionsProfiles.fulfilled, (state, action) => {
      const collectionProfilesData = action.payload;

      state.isEntityCollectionsLoading = false;
      state.entityCollections.forEach((entityCollection, i) => {
        state.entityCollections[i].collection._profile =
          collectionProfilesData[i];
      });
    });

    builder.addCase(fetchAndFillCollections.fulfilled, (state, action) => {
      const filledCollectionEntites = action.payload;

      state.isEntityCollectionsLoading = false;
      state.entityCollections = filledCollectionEntites;
    });

    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action,
    }));
  },
});

export const { setIsEntityCollectionsLoading, setEntityCollections } =
  EntityCollectionSlice.actions;

export default EntityCollectionSlice.reducer;
