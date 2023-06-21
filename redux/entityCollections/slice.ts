/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import {
  IApiEntityCollectionsResponse,
  IEntity,
} from "@/types/entityCollections";
// eslint-disable-next-line import/no-cycle
import { fetchAndFillCollections } from "./thunks";

export type EntityCollectionState = {
  entityCollections: IApiEntityCollectionsResponse;
  isEntityCollectionsLoading: boolean;
  selectedAssetExternalId: undefined | IEntity["externalId"];
};

const initialState: EntityCollectionState = {
  entityCollections: [],
  isEntityCollectionsLoading: false,
  selectedAssetExternalId: undefined,
};

const EntityCollectionSlice = createSlice({
  name: "entityCollections",
  initialState,
  reducers: {
    setEntityCollections: (
      state,
      action: PayloadAction<EntityCollectionState["entityCollections"]>
    ) => {
      state.entityCollections = action.payload;
    },
    setSelectedAssetExternalId: (
      state,
      action: PayloadAction<EntityCollectionState["selectedAssetExternalId"]>
    ) => {
      state.selectedAssetExternalId = action.payload;
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

export const { setEntityCollections, setSelectedAssetExternalId } =
  EntityCollectionSlice.actions;

export default EntityCollectionSlice.reducer;
