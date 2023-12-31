/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import {
  ICollectionEntities,
  IEntityExtended,
  ICarbonsTokenExtended,
  IApiCollectionEntitiesTotal,
  IApiCollectionEntitiesTotalRetired,
  ICollectionTokenIpfs,
  ICarbonTokens,
} from "@/types/entityCollections";

import { INewsPostsResponse, INewsPostsResponseExtended } from "@/types/news";
import { IEntityTransactionResponse } from "@/types/entityCollections/transactions";
import {
  fetchAndFillCollections,
  fetchCollectionsByOwnerAddres,
  fetchEntityByExternalIdAndFill,
  fillEntitiesForUserCollections,
  fetchUsersTokensAndTotal,
  fetchAdminTokens,
  fetchTotalCollectionEntities,
  fetchLastNewsPost,
  fetchNewsPosts,
  fetchCollectionTokenIpfs,
  fetchAndFillCollectionById,
  fetchCollectionEntityBatchesTotalByAdminAccount,
  fetchEntityTransactions,
  fetchUsersTokens,
} from "./thunks";
import { resetEntityTokens, resetSelectedEntity } from "./actions";

export type EntityCollectionState = {
  entityCollections: ICollectionEntities[];
  isEntityCollectionsLoading: boolean;
  isEntityLoading: boolean;
  selectedEntity: undefined | IEntityExtended;
  userEntityCollections: ICollectionEntities[];
  userTokensAndTotal: undefined | ICarbonsTokenExtended;
  adminTokens: undefined | ICarbonsTokenExtended;
  userTokens: undefined | ICarbonTokens;
  totalCollectionEntities: IApiCollectionEntitiesTotal[];
  totalCollectionEntitiesRetired:
    | undefined
    | IApiCollectionEntitiesTotalRetired;
  isAdminTokensLoading: boolean;
  isUserTokensLoading: boolean;
  isEntitiesTotalTokensLoading: boolean;

  lastNewsPost: INewsPostsResponse | undefined;
  lastNewsPostError: string | undefined;
  isLastNewsPostLoading: boolean;

  newsPosts: INewsPostsResponseExtended | undefined;
  newsPostsError: string | undefined;
  isNewsPostsLoading: boolean;

  collectionsTokensIpfs: ICollectionTokenIpfs[];
  collectionsTokensIpfsLoading: boolean;
  collectionTokenIpfsError: string | undefined;

  entityTransactions: IEntityTransactionResponse | undefined;

  entityVerified: boolean;
  entityVerifiedLoading: boolean;
  entityVerifiedError: string | undefined;
};

// TODO: GOD store: add new slices for GLOBAL COLLECTIONS and for USER's COLLECTIONS
// TODO: add rejected thunks state handling

const initialState: EntityCollectionState = {
  entityCollections: [],
  isEntityCollectionsLoading: false,
  isEntityLoading: false,
  selectedEntity: undefined,
  userEntityCollections: [],
  userTokensAndTotal: undefined,
  adminTokens: undefined,
  userTokens: undefined,
  totalCollectionEntities: [],
  totalCollectionEntitiesRetired: undefined,
  isAdminTokensLoading: false,
  isUserTokensLoading: false,
  isEntitiesTotalTokensLoading: true,

  lastNewsPost: undefined,
  lastNewsPostError: "",
  isLastNewsPostLoading: true,

  newsPosts: undefined,
  newsPostsError: undefined,
  isNewsPostsLoading: true,

  collectionsTokensIpfs: [],
  collectionsTokensIpfsLoading: false,
  collectionTokenIpfsError: undefined,

  entityTransactions: undefined,

  entityVerified: false,
  entityVerifiedLoading: false,
  entityVerifiedError: undefined,
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
    setEntityVerified: (
      state,
      action: PayloadAction<{ isVerified: boolean }>
    ) => {
      const { isVerified } = action.payload;
      state.entityVerified = isVerified;
    },
    setEntityVerifiedLoading: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      const { isLoading } = action.payload;
      state.entityVerifiedLoading = isLoading;
    },
    setEntityVerifiedError: (
      state,
      action: PayloadAction<{
        error: EntityCollectionState["entityVerifiedError"];
      }>
    ) => {
      const { error } = action.payload;
      state.entityVerifiedError = error;
    },
  },
  extraReducers(builder) {
    // fetchAndFillCollections
    builder.addCase(fetchAndFillCollections.pending, (state) => {
      if (!state.entityCollections?.length) {
        state.isEntityCollectionsLoading = true;
      }
    });

    builder.addCase(fetchAndFillCollections.fulfilled, (state, action) => {
      state.entityCollections = action.payload;
      state.isEntityCollectionsLoading = false;
    });

    builder.addCase(fetchAndFillCollections.rejected, (state) => {
      state.isEntityCollectionsLoading = false;
    });

    // fetchAndFillCollectionById
    builder.addCase(fetchAndFillCollectionById.pending, (state) => {
      if (!state.entityCollections?.length) {
        state.isEntityCollectionsLoading = true;
      }
    });

    builder.addCase(fetchAndFillCollectionById.fulfilled, (state, action) => {
      if (!action.payload?.collection) return;

      const collectionIndex = state.entityCollections.findIndex(
        ({ collection }) => collection.id === action.payload!.collection.id
      );

      if (collectionIndex !== -1) {
        state.entityCollections[collectionIndex].collection =
          action.payload.collection;
      } else {
        state.entityCollections.push(action.payload);
      }
      state.isEntityCollectionsLoading = false;
    });

    builder.addCase(fetchAndFillCollectionById.rejected, (state) => {
      state.isEntityCollectionsLoading = false;
    });

    // fetchCollectionEntityBatchesTotalByAdminAccount
    builder.addCase(
      fetchCollectionEntityBatchesTotalByAdminAccount.fulfilled,
      (state, { payload: { collectionId, entities } }) => {
        const collectionIndex = state.entityCollections.findIndex(
          ({ collection }) => collection.id === collectionId
        );

        if (collectionIndex !== -1)
          state.entityCollections[collectionIndex].entities = entities;
      }
    );

    // fetchEntityTransactions,
    builder.addCase(fetchEntityTransactions.fulfilled, (state, action) => {
      state.entityTransactions = action.payload;
    });

    // fetchCollectionsByOwnerAddres
    builder.addCase(fetchCollectionsByOwnerAddres.pending, (state) => {
      if (!state.userEntityCollections?.length) {
        state.isEntityCollectionsLoading = true;
      }
    });

    builder.addCase(
      fetchCollectionsByOwnerAddres.fulfilled,
      (state, action) => {
        state.userEntityCollections = action.payload;
        state.isEntityCollectionsLoading = false;
      }
    );

    builder.addCase(fetchCollectionsByOwnerAddres.rejected, (state) => {
      state.isEntityCollectionsLoading = false;
    });

    // fetchEntityByExternalIdAndFill
    builder.addCase(fetchEntityByExternalIdAndFill.pending, (state) => {
      if (!state.selectedEntity) {
        state.isEntityLoading = true;
      }
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
      if (!state.userEntityCollections) {
        state.isEntityLoading = true;
      }
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

    // fetchUsersTokensAndTotal
    builder.addCase(fetchUsersTokensAndTotal.pending, (state) => {
      if (!state.userTokensAndTotal) {
        state.isUserTokensLoading = true;
      }
    });

    builder.addCase(fetchUsersTokensAndTotal.fulfilled, (state, action) => {
      state.userTokensAndTotal = action.payload;
      state.isUserTokensLoading = false;
    });
    // resetAdminAndUserTokens
    builder.addCase(resetEntityTokens, (state) => {
      state.userTokens = undefined;
      state.adminTokens = undefined;
    });

    // resetAdminAndUserTokens
    builder.addCase(resetSelectedEntity, (state) => {
      state.selectedEntity = undefined;
    });

    // fetchAdminTokens
    builder.addCase(fetchAdminTokens.pending, (state) => {
      if (!state.adminTokens) {
        state.isAdminTokensLoading = true;
      }
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

    // fetchInitialNewsPost
    builder.addCase(fetchLastNewsPost.pending, (state) => {
      state.isLastNewsPostLoading = true;
    });
    builder.addCase(fetchLastNewsPost.fulfilled, (state, action) => {
      state.lastNewsPost = action.payload;
      state.isLastNewsPostLoading = false;
    });
    builder.addCase(fetchLastNewsPost.rejected, (state) => {
      state.lastNewsPostError = "An error occurred while fetching data.";
      state.isLastNewsPostLoading = false;
    });

    // fetchNewsPosts
    builder.addCase(fetchNewsPosts.pending, (state) => {
      state.isNewsPostsLoading = true;
    });
    builder.addCase(fetchNewsPosts.fulfilled, (state, action) => {
      state.newsPosts = {
        posts: [
          ...(state.newsPosts?.posts || []),
          ...(action.payload?.posts || []),
        ],
        meta: action.payload?.meta,
      };

      state.isNewsPostsLoading = false;
    });
    builder.addCase(fetchNewsPosts.rejected, (state) => {
      state.newsPostsError = "An error occurred while fetching data.";
      state.isNewsPostsLoading = false;
    });

    // fetchCollectionTokenIpfs
    builder.addCase(fetchCollectionTokenIpfs.pending, (state) => {
      state.collectionsTokensIpfsLoading = true;
    });
    builder.addCase(fetchCollectionTokenIpfs.fulfilled, (state, action) => {
      const collectionIndex = state.entityCollections.findIndex(
        (collectionWithEntities) =>
          collectionWithEntities.collection.id === action.payload?.collectionId
      );

      state.entityCollections[collectionIndex].collection._tokenIpfs =
        action.payload?.collectionTokenIpfs;

      state.collectionsTokensIpfsLoading = false;
    });
    builder.addCase(fetchCollectionTokenIpfs.rejected, (state) => {
      state.collectionTokenIpfsError = "An error occurred while fetching data.";
      state.collectionsTokensIpfsLoading = false;
    });
  },
});

export const {
  setSelectedEntity,
  setEntityVerified,
  setEntityVerifiedError,
  setEntityVerifiedLoading,
} = EntityCollectionSlice.actions;

export default EntityCollectionSlice.reducer;
