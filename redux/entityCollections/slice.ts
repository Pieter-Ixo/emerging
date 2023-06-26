/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import {
  IApiEntityCollectionsResponse,
  IEntityExtended,
} from "@/types/entityCollections";
import {
  fetchAndFillCollections,
  fetchEntityByExterbalIdAndFill,
} from "./thunks";

export type EntityCollectionState = {
  entityCollections: IApiEntityCollectionsResponse;
  isEntityCollectionsLoading: boolean;
  isEntityLoading: boolean;
  selectedEntity: undefined | IEntityExtended;
};

const initialState: EntityCollectionState = {
  entityCollections: [],
  isEntityCollectionsLoading: false,
  isEntityLoading: false,
  selectedEntity: undefined,
};

const EntityCollectionSlice = createSlice({
  name: "entityCollections",
  initialState,
  reducers: {
    setSelectedEntity: (
      state,
      action: PayloadAction<EntityCollectionState["selectedEntity"]>
    ) => {
      state.selectedEntity = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAndFillCollections.pending, (state) => {
      state.isEntityCollectionsLoading = true;
    });

    builder.addCase(fetchAndFillCollections.fulfilled, (state, action) => {
      state.isEntityCollectionsLoading = false;
      state.entityCollections = action.payload;
    });

    builder.addCase(fetchEntityByExterbalIdAndFill.pending, (state) => {
      state.isEntityLoading = true;
    });
    builder.addCase(
      fetchEntityByExterbalIdAndFill.fulfilled,
      (state, action) => {
        state.selectedEntity = action.payload;
        state.isEntityLoading = false;
      }
    );

    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action,
    }));
  },
});

export const { setSelectedEntity } = EntityCollectionSlice.actions;

export default EntityCollectionSlice.reducer;
