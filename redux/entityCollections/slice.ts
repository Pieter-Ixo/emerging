/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import {
  ICollectionEntities,
  IEntityExtended,
  ITokenWhateverItMean,
  IApiCollectionEntitiesTotal,
  IApiCollectionEntitiesTotalRetired,
} from "@/types/entityCollections";

import {
  fetchAndFillCollections,
  fetchCollectionsByOwnerAddres,
  fetchEntityByExternalIdAndFill,
  fillEntitiesForUserCollections,
  fetchUsersTokens,
  fetchAdminTokens,
  fetchTotalCollectionEntities,
} from "./thunks";

export type EntityCollectionState = {
  entityCollections: ICollectionEntities[];
  isEntityCollectionsLoading: boolean;
  isEntityLoading: boolean;
  selectedEntity: undefined | IEntityExtended;
  userEntityCollections: ICollectionEntities[];
  userTokens: undefined | ITokenWhateverItMean;
  adminTokens: undefined | ITokenWhateverItMean;
  totalCollectionEntities: IApiCollectionEntitiesTotal[];
  totalCollectionEntitiesRetired:
    | undefined
    | IApiCollectionEntitiesTotalRetired;
  isAdminTokensLoading: boolean;
  isUserTokensLoading: boolean;
  isEntitiesTotalTokensLoading: boolean;
};

// TODO: GOD store: add new slice and separate admin from user(ENTITY_ADMIN || CONNECTED_ACCOUNT)
// TODO: add rejected thunks state handling

const initialState: EntityCollectionState = {
  entityCollections: [],
  isEntityCollectionsLoading: false,
  isEntityLoading: false,
  selectedEntity: undefined,
  userEntityCollections: [],
  userTokens: undefined,
  adminTokens: undefined,
  totalCollectionEntities: [],
  totalCollectionEntitiesRetired: undefined,
  isAdminTokensLoading: false,
  isUserTokensLoading: false,
  isEntitiesTotalTokensLoading: true,
};

const EntityCollectionSlice = createSlice({
  name: "entityCollections",
  initialState,
  reducers: {
    setSelectedEntity: (
      state,
      action: PayloadAction<IEntityExtended | undefined>
    ) => {
      state.selectedEntity = action.payload;
    },
  },
  // TODO: it throws a warning `createSlice.extraReducers` is deprecated, and will be removed
  extraReducers(builder) {
    // fetchAndFillCollections
    builder.addCase(fetchAndFillCollections.pending, (state) => {
      state.isEntityCollectionsLoading = true;
    });

    builder.addCase(fetchAndFillCollections.fulfilled, (state, action) => {
      state.entityCollections = action.payload;
      state.isEntityCollectionsLoading = false;
    });

    // fetchCollectionsByOwnerAddres
    builder.addCase(fetchCollectionsByOwnerAddres.pending, (state) => {
      state.isEntityCollectionsLoading = true;
    });

    builder.addCase(
      fetchCollectionsByOwnerAddres.fulfilled,
      (state, action) => {
        state.userEntityCollections = action.payload;
        state.isEntityCollectionsLoading = false;
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
    builder.addCase(fillEntitiesForUserCollections.rejected, (state) => {
      state.isEntityLoading = false;
    });

    // fetchUsersTokens
    builder.addCase(fetchUsersTokens.pending, (state) => {
      state.isUserTokensLoading = true;
    });
    builder.addCase(fetchUsersTokens.fulfilled, (state, action) => {
      state.userTokens = action.payload;
      state.isUserTokensLoading = false;
    });

    // fetchAdminTokens
    builder.addCase(fetchAdminTokens.pending, (state) => {
      state.isAdminTokensLoading = true;
    });
    // eslint-disable-next-line no-undef
    builder.addCase(fetchAdminTokens.fulfilled, (state, action) => {
      state.adminTokens = action.payload;
      state.isAdminTokensLoading = false;
    });

    // fetchTotalCollectionEntities
    builder.addCase(fetchTotalCollectionEntities.pending, (state) => {
      state.isEntitiesTotalTokensLoading = true;
    });
    builder.addCase(fetchTotalCollectionEntities.fulfilled, (state, action) => {
      // IApiCollectionEntitiesTotal & IApiCollectionEntitiesTotalRetired
      state.totalCollectionEntities = action.payload.totalEntities;
      state.totalCollectionEntitiesRetired = action.payload.totalRetired;
      state.isEntitiesTotalTokensLoading = false;
    });
    builder.addCase(fetchTotalCollectionEntities.rejected, (state) => {
      state.isEntitiesTotalTokensLoading = false;
    });

    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action,
    }));
  },
});

export const { setSelectedEntity } = EntityCollectionSlice.actions;

export default EntityCollectionSlice.reducer;
