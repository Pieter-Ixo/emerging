/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { IApiEntityCollectionsResponse } from "@/types/entityCollections";
// eslint-disable-next-line import/no-cycle
import { fetchAndFillCollections } from "./thunks";

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
    setEntityCollections: (
      state,
      action: PayloadAction<IApiEntityCollectionsResponse>
    ) => {
      state.entityCollections = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAndFillCollections.pending, (state) => {
      state.isEntityCollectionsLoading = true;
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

export const { setEntityCollections } = EntityCollectionSlice.actions;

export default EntityCollectionSlice.reducer;
