/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import {
  ICollectionEntities,
  IEntityExtended,
  ITokenWhateverItMean,
  IApiCollectionEntitiesTotal,
  IApiCollectionEntitiesTotalRetired,
  ICollectionTokenIpfs,
} from "@/types/entityCollections";

import { INewsPostsResponse, INewsPostsResponseExtended } from "@/types/news";
import {
  fetchAndFillCollections,
  fetchCollectionsByOwnerAddres,
  fetchEntityByExternalIdAndFill,
  fillEntitiesForUserCollections,
  fetchUsersTokens,
  fetchAdminTokens,
  fetchTotalCollectionEntities,
  fetchLastNewsPost,
  fetchNewsPosts,
  fetchCollectionTokenIpfs,
  fetchAndFillCollectionById,
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

  lastNewsPost: INewsPostsResponse | undefined;
  lastNewsPostError: string | undefined;
  isLastNewsPostLoading: boolean;

  newsPosts: INewsPostsResponseExtended | undefined;
  newsPostsError: string | undefined;
  isNewsPostsLoading: boolean;

  collectionsTokensIpfs: ICollectionTokenIpfs[];
  collectionsTokensIpfsLoading: boolean;
  collectionTokenIpfsError: string | undefined;
};

// TODO: GOD store: add new slices for GLOBAL COLLECTIONS and for USER's COLLECTIONS
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

  lastNewsPost: undefined,
  lastNewsPostError: "",
  isLastNewsPostLoading: true,

  newsPosts: undefined,
  newsPostsError: undefined,
  isNewsPostsLoading: true,

  collectionsTokensIpfs: [],
  collectionsTokensIpfsLoading: true,
  collectionTokenIpfsError: undefined,
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
  // FIXME: EMERGING-147: it throws a warning `createSlice.extraReducers` is deprecated, and will be removed
  extraReducers(builder) {
    // fetchAndFillCollections
    builder.addCase(fetchAndFillCollections.pending, (state) => {
      state.isEntityCollectionsLoading = true;
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
      state.isEntityCollectionsLoading = true;
    });

    builder.addCase(fetchAndFillCollectionById.fulfilled, (state, action) => {
      if (!action.payload?.collection) return;

      const updatedIndex = state.entityCollections.findIndex(
        (item) => item.collection.id === action.payload!.collection.id
      );

      if (updatedIndex !== -1) {
        state.entityCollections[updatedIndex] = action.payload;
        state.isEntityCollectionsLoading = false;
        return;
      }
      state.entityCollections.push(action.payload);
      console.log()
      state.isEntityCollectionsLoading = false;
    });

    builder.addCase(fetchAndFillCollectionById.rejected, (state) => {
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

    builder.addCase(fetchCollectionsByOwnerAddres.rejected, (state) => {
      state.isEntityCollectionsLoading = false;
    });

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

    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action,
    }));
  },
});

export const { setSelectedEntity } = EntityCollectionSlice.actions;

export default EntityCollectionSlice.reducer;
