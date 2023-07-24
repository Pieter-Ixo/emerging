/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import {
  ICollectionEntities,
  IEntityExtended,
  ITokenWhateverItMean,
} from "@/types/entityCollections";
import {
  fetchAndFillCollections,
  fetchCollectionsByOwnerAddres,
  fetchEntityByExternalIdAndFill,
  fetchEntitiesByOwnerAddressAndFill,
  fillEntitiesForUserCollections,
  fetchUsersTokens,
} from "./thunks";

export type EntityCollectionState = {
  entityCollections: ICollectionEntities[];
  isEntityCollectionsLoading: boolean;
  isEntityLoading: boolean;
  selectedEntity: undefined | IEntityExtended;
  userEntityCollections: ICollectionEntities[];
  userTokens: undefined | ITokenWhateverItMean;
  isUserTokensLoading: boolean;
};

const initialState: EntityCollectionState = {
  entityCollections: [],
  isEntityCollectionsLoading: false,
  isEntityLoading: false,
  selectedEntity: undefined,
  userEntityCollections: [],
  userTokens: undefined,
  isUserTokensLoading: false,
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
    // fetchAndFillCollections
    builder.addCase(fetchAndFillCollections.pending, (state) => {
      state.isEntityCollectionsLoading = true;
    });

    builder.addCase(fetchAndFillCollections.fulfilled, (state, action) => {
      state.isEntityCollectionsLoading = false;
      state.entityCollections = action.payload;
    });

    // fetchCollectionsByOwnerAddres
    builder.addCase(fetchCollectionsByOwnerAddres.pending, (state) => {
      state.isEntityCollectionsLoading = true;
    });

    builder.addCase(
      fetchCollectionsByOwnerAddres.fulfilled,
      (state, action) => {
        state.isEntityCollectionsLoading = false;
        state.userEntityCollections = action.payload;
      }
    );

    // fetchEntityByExternalIdAndFill
    builder.addCase(fetchEntityByExternalIdAndFill.pending, (state) => {
      state.isEntityLoading = true;
    });
    builder.addCase(
      fetchEntityByExternalIdAndFill.fulfilled,
      (state, action) => {
        state.selectedEntity = action.payload;
        state.isEntityLoading = false;
      }
    );

    // fetchEntityByOwnerAddressAndFill
    builder.addCase(fetchEntitiesByOwnerAddressAndFill.pending, (state) => {
      state.isEntityLoading = true;
    });
    builder.addCase(
      fetchEntitiesByOwnerAddressAndFill.fulfilled,
      (state, action) => {
        state.userEntityCollections[0].entities = action.payload;
        state.isEntityLoading = false;
      }
    );

    // fillEntitiesForUserCollections
    builder.addCase(fillEntitiesForUserCollections.pending, (state) => {
      state.isEntityLoading = true;
    });
    builder.addCase(
      fillEntitiesForUserCollections.fulfilled,
      (state, action) => {
        const { filledEntities, collectionId } = action.payload;
        const collectionIndex = state.userEntityCollections.findIndex(
          (ec) => ec.collection.id === collectionId
        );
        state.userEntityCollections[collectionIndex].entities = filledEntities;
        state.isEntityLoading = false;
      }
    );

    // fetchUsersTokens
    builder.addCase(fetchUsersTokens.pending, (state) => {
      state.isUserTokensLoading = true;
    });
    builder.addCase(fetchUsersTokens.fulfilled, (state, action) => {
      state.userTokens = action.payload;
      state.isUserTokensLoading = false;
    });

    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action,
    }));
  },
});

export const { setSelectedEntity } = EntityCollectionSlice.actions;

export default EntityCollectionSlice.reducer;
